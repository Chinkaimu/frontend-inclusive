/**
 * 继承的多种实现方式
 * 1. 原型链继承： 存在引用类型会被共享的问题
 * 2. 组合继承： 原型链和借用构造函数的组合。
 * 3. 原型式继承： Object.create() 提供新创建的对象的 __proto__
 * 4. 寄生式继承：
 * 5. 寄生组合式继承：
 * 6. ES 6 的继承同时具有 prototype 和 __proto__ 属性
 *  * 子类的 __proto__ 属性表示构造函数的继承，总是指向父类
 *  * 子类的 prototype 的 __proto__ 表示方法的继承，总是指向父类的 prototype 属性
 */

/**
* 原型式继承
*/
function SuperClass () {
  this.value = 'I am super'
}

SuperClass.prototype.getValue = function () {
  return this.value
}

function SubClass () {
  this.value = 'I am sub'
}

SubClass.prototype = new SuperClass()
const instance1 = new SubClass()
instance1.value = 'change'
const instance2 = new SubClass()
console.log(instance1.value)
console.log(instance2.value)

console.log('instance value', instance1.getValue())
console.log('instanceof SubClass', instance1 instanceof SubClass)
console.log('instanceof SuperClass', instance1 instanceof SuperClass)
console.log(SubClass.constructor)

/**
 * 组合继承
 */
function SuperType (name) {
  this.name = name
  this.colors = []
}

SuperType.prototype.sayName = function () {
  console.log(this.name)
}

function SubType (name, age) {
  SuperType.call(this, name)
  this.age = age
}

SubType.prototype = new SuperType()
SuperType.constructor = SubType

/**
 * Object.create 规范化了原型式继承： 使用现有对象（父类的原型）来提供新的对象的 __proto__
 * 子类 Rectangle 的 prototype 属性的 __proto__ 属性表示方法的继承，总是指向父类的 prototype 属性
 */
// eslint-disable-next-line no-undef
Rectangle.prototype = Object.create(Shape.prototype)

/**
* ES6 extends
*/
class Point {
  constructor (x, y) {
    this.x = x
    this.y = y
  }
}

class ColorPoint extends Point {
  constructor (x, y, color) {
    super(x, y)
    this.color = color
  }
}
Object.getPrototypeOf(ColorPoint)

const colorPoint = new ColorPoint(1, 1, 'red')
console.log(colorPoint)
