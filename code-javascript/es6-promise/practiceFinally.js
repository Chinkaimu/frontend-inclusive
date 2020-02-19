const p1 = new Promise((resolve, reject) => {
  throw new Error('generate an error')
})

p1.then(value => {
  console.log(value)
}).finally(() => {
  console.log('What')
})

// finally 只是 resolve 和 reject 存在相同代码时只需要写一次的抽象。
// 返回的依然是 Promise 对象，可以继续 then、catch 继续执行
const p2 = new Promise((resolve, reject) => {
  resolve('OK')
})
p2.then(value => {
  console.log(value)
}).finally(() => {
  console.log('finally')
}).then(() => {
  console.log('after finally')
})
