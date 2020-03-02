/* eslint-disable no-unused-vars */
// 参考文档：https://juejin.im/post/5e3e683ef265da570d734d92#heading-1
/**
 * 1. new Promise时，需要传递一个 executor 执行器，执行器立刻执行
 * 2. executor 接受两个参数，分别是 resolve 和 reject
 * 3. promise 只能从 pending 到 rejected, 或者从 pending 到 fulfilled
 * 4. promise 的状态一旦确认，就不会再改变
 * 5. promise 都有 then 方法，是原型方法，then 接收两个参数，分别是 promise 成功的回调 onFulfilled,
 *      和 promise 失败的回调 onRejected。
 * 6. 如果调用 then 时，promise已经成功，则执行 onFulfilled，并将promise的值作为参数传递进去。
 *      如果promise已经失败，那么执行 onRejected, 并将 promise 失败的原因作为参数传递进去。
 *      如果promise的状态是pending，需要将onFulfilled和onRejected函数存放起来，等待状态确定后，再依次将对应的函数执行(发布订阅)
 * 7. then 的参数 onFulfilled 和 onRejected 可以缺省
 * 8. promise 可以then多次，promise 的then 方法返回一个 promise
 * 9. 如果 then 返回的是一个结果，那么就会把这个结果作为参数，传递给下一个then的成功的回调(onFulfilled)
 * 10. 如果 then 中抛出了异常，那么就会把这个异常作为参数，传递给下一个then的失败的回调(onRejected)
 * 11.如果 then 返回的是一个promise，那么会等这个promise执行完，promise如果成功，
 *   就走下一个then的成功，如果失败，就走下一个then的失败
 * 12. Promise 拥有静态方法 all, race, resolve, reject
 */

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'
function MyPromise (executor) {
  const self = this
  self.status = PENDING
  self.onFulfilled = []// 成功的回调
  self.onRejected = [] // 失败的回调
  // PromiseA+ 2.1
  function resolve (value) {
    if (self.status === PENDING) {
      self.status = FULFILLED
      self.value = value
      self.onFulfilled.forEach(fn => fn())// PromiseA+ 2.2.6.1
    }
  }

  function reject (reason) {
    if (self.status === PENDING) {
      self.status = REJECTED
      self.reason = reason
      self.onRejected.forEach(fn => fn())// PromiseA+ 2.2.6.2
    }
  }

  try {
    // 上述定义了2个函数 resolve 和 reject 作为实参传到 executor 中
    executor(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

// then 是立即执行的，onFulfilled , onRejected 在状态改变后执行
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  // PromiseA+ 2.2.1 / PromiseA+ 2.2.5 / PromiseA+ 2.2.7.3 / PromiseA+ 2.2.7.4
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
  onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

  const self = this
  // PromiseA+ 2.2.7
  const promise2 = new MyPromise((resolve, reject) => {
    // 状态为 resolved 或 rejected 时，主要是 new Promise 时执行器里面调用 resolve/reject 是同步的
    if (self.status === FULFILLED) {
      // PromiseA+ 2.2.2
      // 使用 setTimeout (宏任务)，确保 onFulfilled 和 onRejected 方法异步执行，也确保 promise2 已经定义。
      // 如果不使用 setTimeout，会导致执行 resolvePromise(promise2, x, resolve, reject) 时 promise2 未定义而报错。
      // PromiseA+ 2.2.4 --- setTimeout
      setTimeout(() => {
        // try...catch... 捕捉代码错误或手动抛出的异常，报错或异常当作执行失败处理。异步代码的报错无法被外层的 try...catch... 捕获
        try {
          // PromiseA+ 2.2.7.1
          // x 可能是 promise 也可能是普通值，x 本次 then 调用中 onFulfilled 或 onRejected 回调函数返回的结果，需要传递给下一个 then 的回调函数
          // 使用公共方法 resolvePromise 处理不同情况，并实现 x 值的传递。
          const x = onFulfilled(self.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          // PromiseA+ 2.2.7.2
          reject(e)
        }
      })
    } else if (self.status === REJECTED) {
      // PromiseA+ 2.2.3
      setTimeout(() => {
        try {
          const x = onRejected(self.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch (e) {
          reject(e)
        }
      })
    // 状态为 pending 时，主要是 new Promise 时执行器里面调用 resolve/reject 是异步的
    } else if (self.status === PENDING) {
      // 因为是异步的，不知道何时执行完成，所以这里先存好回调函数的调用（订阅），等状态改变后（发布）再执行（触发事件）
      self.onFulfilled.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(self.value)
            // x 可能是 promise 也可能是普通值，x 本次 then 调用中 onFulfilled 或 onRejected 回调函数返回的结果，需要传递给下一个 then 的回调函数
            // 使用公共方法 resolvePromise 处理不同情况，并实现 x 值的传递。
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
      self.onRejected.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(self.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    }
  })
  return promise2
}

// x 是回调函数的结果
function resolvePromise (promise2, x, resolve, reject) {
  const self = this
  // PromiseA+ 2.3.1
  // 如果 promise2 和 x 指向同一对象, promise2 执行失败并且使用 TypeError 作为执行失败的原因
  if (promise2 === x) {
    reject(new TypeError('Chaining cycle'))
  }
  if (x && (typeof x === 'object' || typeof x === 'function')) {
    // 防止多次调用成功或者失败
    let used // PromiseA+2.3.3.3.3 只能调用一次
    try {
      // 首先存储一个指向 x.then 的引用，然后测试并调用该引用，以避免多次访问 x.then 属性
      // 预防取 x.then 的时候错误，例如: .then 是通过 Object.defineProperty 定义的，定义的 get() {}（getter） 可能代码错误或抛出异常
      const then = x.then
      // 没用 x.then 判断因为怕再次取 .then 的时候出错。例如：通过 Object.defineProperty 定义的 then 可能第一次调用不报错，第二次调用报错或多次调用返回的值可能不同
      if (typeof then === 'function') {
        // 如果 then 是一个函数，则认为 x 是一个 promise，以 x 为 它的 this 调用它, then 调用完成就会取到 x 的状态，采用 x 的状态返回
        // 并且传递两个回调函数作为参数，第一个参数是 resolvePromise，第二个参数是 rejectPromise
        // PromiseA+2.3.3
        // x 执行成功了才可以执行 resolvePromise(promise2, y, resolve, reject)，直到 x 不是 Promise
        then.call(x, (y) => {
          // PromiseA+2.3.3.1
          if (used) return
          used = true
          // y 是 x 调用 then 后成功的结果，采用这个结果
          // y 可能还是一个 promise，所以进行递归调用，直到结果是一个普通值
          resolvePromise(promise2, y, resolve, reject)
        }, (r) => {
          // PromiseA+2.3.3.2
          // r 是调用 x.then 后报错或异常，不再判断是否是 promise，直接传递
          if (used) return
          used = true
          reject(r) // 失败结果向下传递
        })
      } else {
        // PromiseA+2.3.3.4
        if (used) return
        used = true
        // 普通对象，直接传递给下一个 then
        resolve(x)
      }
    } catch (e) {
      // PromiseA+ 2.3.3.2
      if (used) return
      used = true
      reject(e)
    }
  } else {
    // 普通值，直接传递给下一个 then
    // PromiseA+ 2.3.3.4
    resolve(x)
  }
}

new MyPromise((resolve, reject) => {
  resolve('Hello world')
}).then(data => {
  console.log(data)
})

module.exports = Promise
