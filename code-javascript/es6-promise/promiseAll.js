/**
 * promise.all 将多个 Promise 实例包装成新的 Promise 实例，只有所有状态是 Fullfilled 状态才会变成 Fullfilled；有一个状态是 rejected 则 p 的状态就成为 rejected
 */

async function promiseAll (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'))
    }

    let resolvedCount = 0
    const promisesLength = promises.length
    const resolvedValues = new Array(promisesLength)

    for (let i = 0; i < promisesLength; i++) {
      Promise.resolve(promises[i]).then(function (data) {
        resolvedCount++
        resolvedValues[i] = data
        if (resolvedCount === promisesLength) {
          // 一定要 return, 否则代码会继续执行。
          return resolve(resolvedValues)
        }
      }, function (error) {
        return reject(error)
      })
    }
  })
}

const promise1 = Promise.resolve(1)
const promise2 = Promise.resolve(2)
//  通过 then 回调。
promiseAll([promise1, promise2]).then((value) => {
  console.log('here is the callback')
  console.log(value)
})

async function func () {
  console.log('here is an async function')
  // 不能在 async 外使用 await
  const result = await promiseAll([promise1, promise2])
  console.log(result)
}
func()

/**
 *  here is an async function
 *  here is the callback
 *  [ 1, 2 ]
 *  [ 1, 2 ]
 */
