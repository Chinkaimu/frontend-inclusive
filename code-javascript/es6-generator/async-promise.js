var fs = require('fs')

function * func () {
  // yield 执行返回结果为 fs.readFile thunk 化后的只接受回调函数作为参数的函数
  // 回调函数就是 执行next
  var data31 = yield readFile('file1.js')
  console.log('test3 data1', data31)

  var data32 = yield readFile('file2.js')
  console.log('test3 data2', data32)
}

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      // err = 'sorry'
      if (err) {
        // 捕获错误去处理
        reject(err)
      }
      resolve(data)
    })
  })
}

const gen = func()
const result = gen.next()

result.value.then(data => {
  return data
}).catch(error => {
  console.log('error occurs', error)
})
