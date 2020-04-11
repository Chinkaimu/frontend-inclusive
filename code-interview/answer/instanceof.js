const myInstanceOf = (instance, constuctor) => {
  // 实例的原型
  // eslint-disable-next-line no-proto
  let instanceProto = instance.__proto__
  // 构造函数的原型
  const constructorProto = constuctor.prototype

  while (true) {
    if (instanceProto === null) return false
    if (instanceProto === constructorProto) return true
    // eslint-disable-next-line no-proto
    instanceProto = instanceProto.__proto__
  }
}

function Person (name) {
  this.name = name
}

function Dog () {}

const person = new Person('Lily')
console.log(myInstanceOf(person, Person))
console.log(myInstanceOf(Dog, person))
