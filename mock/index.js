const Mock = require('mockjs')

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
    let goods = {
      'list|6': [
        {
          id: '@id',
          name: '@cword(2,6)',
          'data|6': [
            {
              id: '@id',
              img: 'static/fruit/baixiangguo.png',
              title: '@cword(2,6)',
              describe: '@cparagraph',
              amount: '@integer(10, 200)',
              price: '@integer(10, 40)'
            }
          ]
        }
      ]
    }

    res.json({
      code: '0000',
      data: Mock.mock(goods)
    })
  })
}
