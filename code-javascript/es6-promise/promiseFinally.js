// eslint-disable-next-line no-extend-native
Promise.prototype.myFinally = function (callback) {
  // 获取构造函数，以便于后续调用 Promise 的静态方法
  const P = this.constructor
  return this.then(
    // P.resolve 将回调函数的执行结果转换成 Promise 对象，并且将之前的计算结果透传下去
    value => P.resolve(callback()).then(() => value),
    // 以下为同等效果
    // error => P.reject(callback()).catch(() => { throw error })
    error => P.resolve(callback()).then(() => { throw error })
  )
}

const p1 = new Promise((resolve, reject) => {
  throw new Error('generate an error')
})

// then 不会执行，因为出现了错误
p1.then(() => {
  console.log('then before catch')
}).catch(error => {
  console.log(error)
})

// then 会执行，错误已经被捕获，不会再向后传递。此时 then 是上一个 then 产生的 promise 的回调函数，不是 p1 的回调函数
p1.catch(error => {
  console.log(error)
}).then(() => {
  console.log('then after catch')
})

/**
 * 如下第二个 catch 不会再次报错，因为错误已经被捕获，不会再向后传递。
 */
p1.catch(error => {
  console.log(error)
}).myFinally(() => {
  console.log('reject finally')
}).catch(error => {
  console.log('my Error is ', error)
})

/**
 * 如下先执行 finally，错误会继续往后传递
 */
p1.myFinally(() => {
  console.log('reject finally')
}).catch(error => {
  console.log('my Error is ', error)
})

// finally 只是 resolve 和 reject 存在相同代码时只需要写一次的抽象。
// 返回的依然是 Promise 对象，可以继续 then、catch 继续执行
const p2 = new Promise((resolve, reject) => {
  resolve('OK')
})
p2.then(value => {
  console.log(value)
}).myFinally(() => {
  console.log('finally')
}).then(() => {
  console.log('after finally')
})
