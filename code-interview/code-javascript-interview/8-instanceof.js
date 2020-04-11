// eslint-disable-next-line no-unused-vars
function myInstanceOf (instance, constructor) {
  // 获取实例的隐式原型
  let instanceProto = Object.getPrototypeOf(instance)

  while (true) {
    if (instanceProto === null) return false
    // 实例原型等于构造函数的原型
    if (instanceProto === constructor.prototype) return true

    instanceProto = Object.getPrototypeOf(instanceProto)
  }
}

function SuperType (name) {
  this.name = name
}

function SubType (name) {
  this.name = name
}

SubType.prototype = new SuperType()

const instance = new SubType()

console.log(instance instanceof SubType)
