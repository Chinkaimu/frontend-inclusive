/**
 * 编写js代码，实现奇数次调用时，打印1，偶数次调用时打印2
 * 思路： 闭包记录状态；代理
 */

// 闭包
function foo1 () {
  let flag = false
  return function () {
    flag = !flag
    // change flag fist
    console.log(flag ? 1 : 2)
  }
}

// eslint-disable-next-line no-unused-vars
const print = foo1()

// es6 iterator 实现（也包含了闭包的思想）

// 设置函数属性能够被函数自己读取，这里注意的是不能用声明，需要定义变量
const foo2 = () => {
  console.log(foo2.counter++ % 2 ? 1 : 2)
}
foo2.counter = 1

// 给对象增加代理，取读取属性。 读一次属性就会调用一次 get
const obj = {}
// IE8 实现不彻底，不建议使用。可能存在兼容性问题
Object.defineProperty(obj, 'counter', {
  get: function () {
    return 3
  }
})

// 第一个参数可以直接使用空对象
const proxy = new Proxy(obj, {
  counter: 1,
  get: function (target, propKey, receiver) {
    // 这里的 this 不是 bar
    console.log(this.counter++ % 2 ? 1 : 2)
    // 获取 counter 之，counter 值
    return Reflect.get(target, propKey, receiver)
  }
})

const foo = () => proxy.counter

console.log(foo())
console.log(foo())
console.log(foo())
console.log(foo())
console.log(foo())
console.log(foo())
