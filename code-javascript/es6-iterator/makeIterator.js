const iterator = makeIterator(['a', 'b'])

function makeIterator (array) {
  let nextIndex = 0
  return {
    next: function () {
      return nextIndex < array.length
        ? { value: array[nextIndex++], done: false }
        : { value: undefined, done: true }
    }
  }
}

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
