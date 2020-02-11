const iterator = makeIterator(['a', 'b'])

// Provide the interface, visit members one by one through the function next.
// Iterator is an object that include a next function which visits the states one by one.
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
