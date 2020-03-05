const Mock = require('mockjs')

let login = {
  firstname: '@cfirst',
  lastname: '@clast'
}

module.exports = function(app) {
  //   let bodyParser = require('body-parser')
  //   app.use(bodyParser.urlencoded({ extended: false }))

  app.post('/login', (req, res) => {
    res.json(Mock.mock(Object.assign(login, req.body)))
  })

  app.get('/login', (req, res) => {
    res.json(Mock.mock(Object.assign(login, req.query)))
  })

  app.post('/sleep', (req, res) => {
    let start = new Date()
    let end = new Date()
    while (end - start < 2000) {
      end = new Date()
    }

    res.json({
      code: '104',
      data: Mock.mock(login)
    })
  })
}
