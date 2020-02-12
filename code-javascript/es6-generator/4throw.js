/* eslint-disable no-useless-catch */
// Throw errors outside the generator function, however it can be caught inside the generator function.
function * generator () {
  try {
    yield 'hello1'
    yield 'world1'
  } catch (e) {
    console.log('catch inside ', e)
  }
  try {
    yield 'Thank'
    yield 'you'
  } catch (e) {
    console.log('catch inside ', e)
  }
}

const gObj1 = generator()
console.log('gObj1 ', gObj1.next())
gObj1.throw('abc')
console.log('gObj1 ', gObj1.next())
console.log('gObj1 ', gObj1.next())

const gObj2 = generator()
try {
  console.log('gObj2 ', gObj2.next())
  gObj2.throw('an error 2')
  console.log('gObj2 ', gObj2.next())
} catch (e) {
  console.log('out catch error ', e)
}
gObj2.next()

const gObj3 = generator()
console.log('gObj3 ', gObj3.next())
try {
  // 非遍历器 throw 抛出的错误对遍历器状态没有影响
  throw new Error()
} catch (e) {
  console.log('gObj3 ', gObj3.next())
}
console.log('gObj3 ', gObj3.next())

function * gen () {
  while (true) {
    try {
      yield 42
    } catch (e) {
      console.log('Error caught!')
    }
  }
}

const g = gen()
console.log(g.next())
// { value: 42, done: false }
g.throw(new Error('Something went wrong'))
// "Error caught!"
// { value: 42, done: false }
console.log(g.next())
