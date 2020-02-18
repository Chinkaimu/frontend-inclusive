const promise = new Promise(function (resolve, reject) {
  resolve(1)
  // reject(1)
})
console.log('promise', promise)

// promise.then(() => {
//   console.log('done')
// })
