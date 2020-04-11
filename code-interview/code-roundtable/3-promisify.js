/**
 * 解决回调地狱：实现一个函数，可以将异步函数转化成promise函数。
 * 返回一个函数，该函数接收原函数需要的参数，在调用时返回一个对象，该对象立即执行原函数。原函数执行完成后，修改回调结果状态。
 * promise 根据对象的返回来执行 then 后面的回调函数
 */

// Mark: 1. 需要返回的是一个函数，还能接收原来的参数； 2. 函数执行以后是返回一个 Promise 对象
function promisify (funcWithCallback) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      funcWithCallback(...args, (error, data) => {
        if (error) {
          reject(error)
        } else {
          resolve(data)
        }
      })
    })
  }
}
