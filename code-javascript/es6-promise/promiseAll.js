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

const myPromiseAll = (arr) => {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(arr)) {
      return reject(new TypeError('arguments must be an array'))
    }

    let resolvedCount = 0
    const resolvedData = new Array(arr.length)

    for (let i = 0; i < arr.length; i++) {
      // 1. 错误点：需要用立即执行函数，确保 promise 的顺序没有变
      (function (i) {
        // 2. 错误点：增加 Promise.resolve 转化，如果是 Promise 对象则返回原对象，否则先转化成 Promise 对象
        Promise.resolve(arr[i]).then((data) => {
          resolvedData[i] = data
          resolvedCount++
          if (resolvedCount === arr.length) {
            // 3. 错误点：没有 return 返回，当前函数应该结束执行。
            return resolve(resolvedData)
          }
        }, (error) => {
          return reject(error)
        })
      })(i)
    }
  })
}

myPromiseAll([1, 2, 3]).then((value) => {
  console.log(value)
})

// Promise.all() Promise.resolve() Promise.race() Promise.reject() 是 promise 的静态方法，如下方式添加关系
function ParentFunc () {
}
ParentFunc.child = () => {
  console.log('child')
}
ParentFunc.child()
