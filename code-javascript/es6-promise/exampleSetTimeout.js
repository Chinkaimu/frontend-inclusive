// // 因为要传递 time 参数，所以增加了一层包裹，没有直接调用 new Promise
function delay (time) {
  return new Promise(function (resolve) {
    return setTimeout(() => {
      resolve('Hi')
      console.log('in setTimeout hello')
    }, time)
  })
}

function logHi (value) {
  console.log('value', value)
  // TODO: instance is pending????
  console.log('instance in then', instance)
  console.log('logHi callInstance', callInstance)
}

// It is a promise, when it is resolved the call back will be called.
const instance = delay(2)
// return a new promise
const callInstance = instance.then(logHi)
console.log('instance', instance)

const instance2 = new Promise(function (resolve) {
  setTimeout(() => {
    resolve('1')
  }, 0)
})
instance2.then(() => {
  console.log('done')
  console.log('instance2 in then', instance2)
})
