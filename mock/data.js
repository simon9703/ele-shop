const Mock = require('mockjs')

let ss = Mock.mock({
  'list|3': [
    {
      'id|+1': 3
    }
  ]
})

// let rr = Mock.Random.increment()
console.log(ss.list[0])
console.log(ss.list[1])
console.log(ss.list[2])
