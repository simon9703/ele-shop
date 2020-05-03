const Mock = require('mockjs')
const fs = require('fs')
const join = require('path').join

/**
 * 服务器等待时间
 * @param {*} times 毫秒
 */
function sleep(times = 0) {
  let start = new Date()
  let end = new Date()
  while (end - start < times) {
    end = new Date()
  }
}

module.exports = function(app) {
  var bodyParser = require('body-parser')
  app.use(bodyParser.json()) // 添加post + json 参数解析器

  app.post('/sleep', (req, res) => {
    let user = {
      firstname: '@cfirst',
      lastname: '@clast'
    }
    res.json({
      code: '104',
      data: Mock.mock(user)
    })
  })

  // 订单列表
  app.post('/orders', (req, res) => {
    // sleep(req.body.sleep)
    sleep(1500)
    let orders = {
      'list|8': [
        {
          img: '/static/drink/yinliao_@integer(1,20).png',
          shopName: '@cword(4,8)',
          status: '订单已送达',
          date: '@datetime',
          clarify: '@cword(4,8)-等@integer(1,20)件商品',
          price: '@float(20, 200, 2, 2)'
        }
      ]
    }

    res.json({
      code: '0000',
      data: Mock.mock(orders)
    })
  })

  // 商品列表
  app.post('/goods', (req, res) => {
    sleep(1000)
    let paths = findSync('./static/fruit') // 所有图片路径：['static/fruit/baixiangguo.png']
    let names = findSync('./static/fruit', false) // 所有图片名称：baixiangguo
    let goods = {
      'list|6': [
        {
          id: '@id',
          name: '@cword(2,6)',
          'data|6': [
            {
              id: '@id',
              // img: 'static/fruit/baixiangguo.png',
              'img|1': paths,
              // 'title|1': names,
              describe: '@cparagraph',
              amount: '@integer(10, 200)',
              price: '@integer(10, 40)'
            }
          ]
        }
      ]
    }

    // 根据图片路径找到图片名称。
    let c = Mock.mock(goods)
    c.list.forEach((items) => {
      items.data.forEach((current) => {
        current.title = names[paths.indexOf(current.img)]
      })
    })

    res.json({
      code: '0000',
      data: c
    })
  })
}

/**
 * 遍历获取文件夹下，所有 完整路径 | 文件名称。
 * @param {} startPath
 * @param {} completePath 是否完整路径
 */
function findSync(startPath, completePath = true) {
  let result = []
  function finder(path) {
    let files = fs.readdirSync(path)
    files.forEach((val, index) => {
      let fPath = join(path, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile()) {
        if (completePath) {
          result.push(fPath)
        } else {
          result.push(val.split('.')[0])
        }
      }
    })
  }
  finder(startPath)
  return result
}
