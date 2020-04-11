function Person (name, age, job) {
  this.name = name
  this.age = age
  this.job = job
  this.sayName = function () {
    console.log(this.name)
  }
}
console.log(new Person())

// use object literal
function createObject1 (constructor, ...res) {
  const newObject = {}
  // eslint-disable-next-line no-proto
  newObject.__proto__ = constructor.prototype

  const value = constructor.call(newObject, ...res)
  return value || newObject
}
console.log(createObject1(Person))

// use Object.create()
function createObject (constructor, ...res) {
  const newObject = Object.create(null)
  // eslint-disable-next-line no-proto
  newObject.__proto__ = constructor.prototype

  const value = constructor.call(newObject, ...res)
  return value || newObject
}

// use Object.setPrototypeOf()
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf
console.log(createObject(Person))
const createNew = (Con, ...args) => {
  const obj = {}
  Object.setPrototypeOf(obj, Con.prototype)
  const result = Con.apply(obj, args)
  return result instanceof Object ? result : obj
}
console.log(createNew(Person))
