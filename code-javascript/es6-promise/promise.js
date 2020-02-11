function delay (t) {
  return new Promise(function (resolve) {
    return setTimeout(() => {
      resolve('Hi')
      console.log('hello')
    }, t)
  })
}

function logHi (value) {
  console.log(value)
}

const instance = delay(2000).then(logHi)
console.log(instance)
