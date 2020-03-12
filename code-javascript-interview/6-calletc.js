/**
 * call, apply, bind
 * 1. 改变 this 指向，主要思路将函数绑定到对象上，作为对象属性时 this 指向当前对象
 * 2. call 参数是分开的
 * 3. appply 参数是数组
 * 4. bind 返回的是函数，需要包一层。 bind 还需要考虑 new 运算。不能忘了原型处理。
 */

// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (context, ...args) {
  // Mark: 如果不存在，则是 window 对象。
  // eslint-disable-next-line no-new-object
  if (typeof context !== 'object') {
    context = {}
  }

  const key = Symbol('call')

  context[key] = this

  const result = context[key](...args)

  delete context[key]

  return result
}

function getLength (object) {
  return 1
}

function getName () {
  console.log(this.name)
}

console.log(getLength.call(2))
console.log(getLength.myCall(2))
getName.myCall({
  name: 'hello'
})

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

// eslint-disable-next-line no-extend-native
Function.prototype.myBind = function (context, ...args1) {
  // Mark: 判断 this 是不是函数
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }
  const fn = this

  const bindFn = function (...args2) {
    // Mark: 结果要返回，不要忘记 return
    // Mark: 要考虑 new 计算，new 计算要用自己作为 this，不能改变
    return fn.call(this instanceof bindFn ? this : context, ...args1, ...args2)
  }

  bindFn.prototype = Object.create(fn.prototype)
  return bindFn
}
