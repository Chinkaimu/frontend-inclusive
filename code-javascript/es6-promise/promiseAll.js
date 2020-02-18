/**
 * promise.all 将多个 Promise 实例包装成新的 Promise 实例，只有所有状态是 Fullfilled 状态才会变成 Fullfilled；有一个状态是 rejected 则 p 的状态就成为 rejected
 */

function promiseAll (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('arguments must be an array'))
    }

    let resolvedCount = 0
    const promisesLength = promises.length
    const resolvedValues = new Array(promisesLength)

    for (let i = 0; i < promisesLength; i++) {
      (function (i) {
        Promise.resolve(promises[i]).then(function (data) {
          resolvedCount++
          resolvedValues[i] = data
          if (resolvedCount === promisesLength) {
            return resolve(resolvedValues)
          }
        }, function (error) {
          return reject(error)
        })
      })(i)
    }
  })
}

promiseAll([1, 2, 3]).then((value) => {
  console.log(value)
})
