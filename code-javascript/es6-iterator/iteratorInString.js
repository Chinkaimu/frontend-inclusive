// eslint-disable-next-line quotes
// eslint-disable-next-line no-new-wrappers
const str = new String('hi')

const strIterator = str[Symbol.iterator]()
console.log(strIterator.next())
console.log(strIterator.next())
console.log(strIterator.next())
console.log([...str])

str[Symbol.iterator] = function () {
  let step = 1
  return {
    next: function () {
      if (step <= 1) {
        step++
        return { value: 'bye', done: false }
      } else {
        return { value: undefined, done: true }
      }
    }
  }
}

console.log([...str])
