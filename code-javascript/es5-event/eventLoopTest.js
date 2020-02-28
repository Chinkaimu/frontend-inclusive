console.log('script start')

setTimeout(function () {
  console.log('setTimeout')
}, 0)

const p = Promise.resolve().then(function () {
  console.log('promise1')
})
p.then(function () {
  console.log('promise2')
})

console.log('script end')
