const obj = {}
obj[Symbol.iterator] = function * () {
  yield 'hello'
  yield 'world'
}

console.log([...obj])

const otherObj = {
  * [Symbol.iterator] () {
    yield 'hello'
    yield 'world'
  }
}

console.log([...otherObj])
