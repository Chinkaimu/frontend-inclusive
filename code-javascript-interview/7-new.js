/**
 * new 创建一个实例
 * （1）返回一个对象，内部构造
 * （2）属性是构造函数中 this 给赋值的。
 * （3）原型是构造函数的原型
 */

// eslint-disable-next-line no-extend-native
Function.prototype.myApply = function (context, args) {
  if (typeof context !== 'object') {
    context = {}
  }

  const key = Symbol('apply')
  context[key] = this

  const result = args ? context[key](...args) : context[key]()

  delete context[key]

  return result
}

function Person (name, age) {
  this.name = name
  this.age = age
}

function createNew (Con, ...args) {
  // 使用现有的对象来提供新创建的对象的__proto__
  // 如果你关心性能，你应该避免设置一个对象的 [[Prototype]]。相反，你应该使用 Object.create()来创建带有你想要的[[Prototype]]的新对象。
  const obj = Object.create(Con.prototype)
  const result = Con.apply(obj, args)

  // Mark: 如果构造函数有执行结果返回则用构造函数的执行结果；否则使用修改后的 obj 返回
  return result instanceof Object ? result : obj
}
console.log(createNew(Person, 'chen', 11))
