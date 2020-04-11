exports.done = false
// 不会去从头执行 a，只输出已执行部分
let a = require('./a.js')
// a 还没有执行到 a.done = true，所以这里输出的是 false
console.log('b.js 之中， a.done = %j', a.done)

exports.done = true
console.log('b.js 执行完毕')