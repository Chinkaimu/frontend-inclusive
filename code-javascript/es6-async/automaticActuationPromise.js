var fs = require('fs')

co(function * func () {
  // yield 执行返回结果为 fs.readFile promise 化后的只接受回调函数作为参数的函数
  // 回调函数就是 执行next
  var data31 = yield readFile('file1.js')
  console.log('test3 data1', data31)

  var data32 = yield readFile('file2.js')
  console.log('test3 data2', data32)
})

function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      // err = 'sorry'
      if (err) {
        // 捕获错误去处理
        reject(err)
      }
      return resolve(data)
    })
  })
}

function co (func) {
  const gen = func()

  function _next (data) {
    // 要把上一次的结果作为 yield 的返回值作为参数传给下一次 next 调用
    const result = gen.next(data)
    if (result.done) return result.value
    result.value.then(data => {
      // 只要还未结束就不停的调用 next
      _next(data)
    }).catch(error => {
      console.log('error occurs', error)
    })
  }
  _next()
}
