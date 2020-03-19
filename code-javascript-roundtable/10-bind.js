/**
 * bind 函数： 改变 this 指向后返回一个新的函数
 */

// args1 是调用 bind 时候传入的参数
// eslint-disable-next-line no-extend-native
Function.prototype.myBind = function (context, args1) {
  // TODO: 加个判错
  if (typeof this !== 'function') {
    throw new Error('Function.prototype.bind - what is trying to be bound is not callable')
  }

  // args2 是在调用函数时传入的参数
  const func = this
  const bindFunc = function (args2) {
    // Mark1: 需要考虑 new 计算，这时候只需要返回函数本身供 new 调用。
    // TODO: 调用 new 的时候，this 是内部构造的，是 bindFunc 函数，而不是被绑定的函数
    return this instanceof bindFunc ? this : func.call(context, ...args1, ...args2)
  }

  // Mark2: 需要修改原型，原型链的混成形式（寄生组合模式中原型的方式《高程 P172》）
  bindFunc.prototype = Object.create(func.prototype)
  return bindFunc
}
