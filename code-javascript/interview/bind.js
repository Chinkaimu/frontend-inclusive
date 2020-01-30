/**
 * bind simulation
 */
const obj = {
  name: 'chm',
  age: 12
}

function TestBind (...res) {
  console.log(this.name)
  console.log(res)
  this.age = 24
}

TestBind.bind(obj, 1, 2)()
// Actually the bind has implemented Currying.
TestBind.bind(obj)(1, 2)

// When a function used as a constructor of Object, there is no need of return.
const newObj = new TestBind(1, 2)
console.log('new TestBind', newObj)
const returnTest = TestBind(1, 2)
console.log('return Test', returnTest)

/**
 * 1. Create a function that bind 'this' through call prototype, there will execute to bind this and then execute the original function. In this term, closure is used.
 * 2. Refresh the new function's prototype by the original function's.
 */
Function.prototype.bind2 = function (context, ...args) {
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  const fn = this
  const bindFn = function (...newFnArgs) {
    // When there occurs 'New' operation, this is instance of bindFn.
    return fn.call(this instanceof bindFn ? this : context, ...args, ...newFnArgs)
  }
  // The newly create object will inherit all the prototype object properties.
  bindFn.prototype = Object.create(fn.prototype)
  return bindFn
}

const NewTest = TestBind.bind2(obj, 1, 2)
const newTest = new NewTest()
console.log(newTest)

console.log(NewTest.prototype === TestBind.prototype)
