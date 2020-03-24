let counter = 3
function incCounter () {
  counter++
}

exports.counter = counter
exports.incCounter = incCounter

// 与上面的内容等价。 exports = module.exports = {}
// module.exports = {
//   counter: counter,
//   incCounter: incCounter
// }