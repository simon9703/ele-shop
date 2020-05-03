const fs = require('fs')
let join = require('path').join

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

console.log(findSync('./static/fruit', false))
