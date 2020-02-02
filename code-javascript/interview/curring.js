/**
 * 利用闭包把传入参数保存起来，当传入参数的数量足够执行函数时，就开始执行函数
 * @param {*} fn
 * @param  {...any} args
 */
const curring = (fn, ...args) => {
  // 参数个数满足了就执行。
  // The length property indicates the number of parameters expected by function.
  if (args.length === fn.length) {
    return fn(...args)
  }
  return (...newArgs) => {
    // 将前后传入的参数组合到一起
    return curring(fn, ...args, ...newArgs)
  }
}
const sum = (a, b) => a + b
console.log(curring(sum)(1, 2))
console.log(curring(sum)(1)(2))

const sum1 = (a, b, c) => a + b + c
console.log(sum1(1, 2, 3))
console.log(curring(sum1)(1, 2, 3))
console.log(curring(sum1)(1)(2)(3))
