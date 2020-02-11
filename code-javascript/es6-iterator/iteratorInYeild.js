const generator = function * () {
  yield 1
  yield * [1, 2, 3]
  yield 5
}

const iterator = generator()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

const generator1 = function * () {
  yield 1
  yield [1, 2, 3]
  yield 5
}

const iterator1 = generator1()
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
console.log(iterator1.next())
