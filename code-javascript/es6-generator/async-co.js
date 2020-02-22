var fs = require('fs')

// function testAsync1 () {
//   var data1 = fs.readFile('file1.js', (err, data) => {
//     console.log('test1 file1 read', data)
//     if (err) throw (err)
//     var data2 = fs.readFile('file2.js', (err, data) => {
//       console.log('test1 file2 read', data)
//       if (err) throw (err)
//     })
//     console.log('test1 data2', data2)
//   })
//   console.log('test1 data1', data1)
// }
// testAsync1()

// function * testAsync2 () {
//   var data21 = yield fs.readFile('file1.js', (err, data) => {
//     console.log('test2 file1 read', data)
//     if (err) gen.throw(err)
//     gen.next(data)
//   })
//   console.log('test2 data1', data21)

//   var data22 = yield fs.readFile('file2.js', (err, data) => {
//     console.log('test2 file2 read', data)
//     if (err) gen.throw(err)
//     gen.next(data)
//   })

//   console.log('test2 data2', data22)
// }

// var gen = testAsync2()
// gen.next()

console.log('here', fs.readFile('file1.js', () => {}))

co(function * () {
  // yield 执行返回结果为 fs.readFile thunk 化后的只接受回调函数作为参数的函数
  // 回调函数就是 执行next
  var data31 = yield readFile('file1.js')
  console.log('test3 data1', data31)

  var data32 = yield readFile('file2.js')
  console.log('test3 data2', data32)
})

/**
 * automatic actuator for generator
 * Function readFile only need a param `path` . Developer don't have to manually deal witch callback, we should make call automatically --- use next call next.
 * Make yield value a function which can call the callback, and the call back was added by calling next yield.
 * @param {*} path
 */
function readFile (path) {
  return function (callback) {
    fs.readFile(path, callback)
  }
}

/**
 * Auto
 * Add `next` ability to call the next yield.
 * Get the first generator and call the first next.
 * The first next call yield a function that could merge the function and call back.
 * @param {*} fn
 */
function co (fn) {
  var gen = fn()

  // The params of fs.readFile's callback is error and data. Therefore the next will get the data, and gen.next will set the last yield result is data.
  function next (_err, data) {
    // In last loop, there have yield value data.
    // console.log('last data', data)
    var result = gen.next(data)
    if (!result.done) {
      // Do fs.readFile actually
      // result.value is a Thunk function and next is callback
      result.value(next)
    }
  }

  // The first call next and yield value
  next()
}
