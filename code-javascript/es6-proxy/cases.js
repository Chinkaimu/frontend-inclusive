// 重载点运算
const obj = new Proxy({}, {
  get: function (target, key, receiver) {
    console.log('getting', key)
    // 调用本身的方法
    return Reflect.get(target, key, receiver)
  },
  set: function (target, key, value, receiver) {
    console.log('setting', key)
    return Reflect.set(target, key, value, receiver)
  }
})
obj.count = 1
++obj.count

// 拦截多个操作
var handler = {
  get: function (target, name) {
    if (name === 'prototype') return Object.prototype
    return 'Hello, ' + name
  },
  // 在原来函数的基础上增加了 target 拦截目标对象
  apply: function (target, thisBinding, args) {
    // 执行 target
    return target(...args)
  },
  // 注意：是 construct 不是 constructor
  construct: function (target, args) {
    return { value: args[1] }
  }
}

// target 是要拦截的目标
// 注意：当需要改变 construct 时，不能用箭头函数。this 需要指向传入的函数。
var fproxy = new Proxy(function (x, y) {
  return x + y
}, handler)

console.log(fproxy(1, 2))
console.log(fproxy.prototype)
console.log(fproxy.foo)
console.log(new fproxy(1, 2))

const obj1 = {
  name: 'chinkaimu'
}
const loggedObj = new Proxy(obj1, {
  get (target, name) {
    console.log('get', target, name)
    return Reflect.get(target, name)
  },
  deleteProperty (target, name) {
    console.log('delete', name)
    return Reflect.deleteProperty(target, name)
  },
  has (target, name) {
    console.log('has', name)
    return Reflect.has(target, name)
  }
})

console.log(loggedObj.name)
