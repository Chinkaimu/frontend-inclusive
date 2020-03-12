function myInstanceOf (instance, constructor) {
  let instanceProto = Object.getPrototypeOf(instance)

  while (true) {
    if (instanceProto === null) return false
    if (instanceProto === constructor.prototype) return true

    instanceProto = Object.getPrototypeOf(instanceProto)
  }
}

function Person (name) {
  this.name = name
}

function Dog () {}

const person = new Person('Lily')
console.log(myInstanceOf(person, Person)) // true
console.log(myInstanceOf(Dog, person)) // false
