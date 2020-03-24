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

  app.post('/orders', (req, res) => {
    sleep(req.body.sleep)
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
}
