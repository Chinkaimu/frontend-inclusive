/**
 * 递归中止的条件：实参个数已经超过形参个数
 * 递归中止返回的情况：可能从柯里化函数返回最终结果；也可能从返回函数里返回最终结果
 */
/**
 * 递归中止的条件：实参个数已经超过形参个数
 */
function sum (a, b, c) {
  console.log(a + b + c)
  return a + b + c
}

function trueCurring (fn) {
  var args = Array.prototype.slice.call(arguments, 1)

  if (args.length >= fn.length) {
    return fn.apply(null, args)
  }

  return function () {
    var innerArgs = Array.prototype.slice.call(arguments)
    var finalArgs = args.concat(innerArgs) // 数组

    if (finalArgs.length >= fn.length) {
      return fn.apply(null, finalArgs)
    }
    // 客户化函数的第一个参数是 fn，所以要将其放回第一个
    finalArgs.unshift(fn)
    // 仍然返回柯里化函数，继续柯里化，直到fn不需要更多的参数
    return trueCurring.apply(null, finalArgs)
  }
}

trueCurring(sum, 1, 2, 3)
trueCurring(sum, 1, 2)(3)
/**
 * (sum,1)第一次执行返回一个 function；
 * (2)执行第一次返回的function，走到执行trueCurring.apply(fn,[1,2])再次返回一个匿名函数function；
 * (3)执行function，此时args是[1,2] innerArgs 是3
 */
trueCurring(sum, 1)(2)(3)
// trueCurring(sum)(1)(2)(3)(4);


/**
 * ES6 实现方案
 */
function newCurring (fn, ...args) {
  if (args.length >= fn.length) {
    return fn(...args)
  }

  return function (...args2) {
    if ((args.length + args2.length) >= fn.length) {
      return fn(...args, ...args2)
      }

    return newCurring(fn, ...args, ...args2)
  }
}

console.log('new', newCurring(sum, 1)(2)(3))
console.log(newCurring(sum, 1, 2, 3))
console.log(newCurring(sum, 1, 2)(3))
console.log(newCurring(sum)(1)(2)(3))
// console.log('end',newCurring(sum)(1)(2)(3)(7));
