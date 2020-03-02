/**
 * Transfer through string.
 */
const flatten1 = (arr) => arr.toString().split(',').map(item => +item)
console.log(flatten1([0, [1], [2, [3]]]))

/**
 * reduce + recursion + spread operator
 */
const flatten2 = (arr) => {
  return arr.reduce((accumulator, currentValue) => {
    return Array.isArray(currentValue)
    // key point: spread the result
      ? [...accumulator, ...flatten2(currentValue)]
      : [...accumulator, currentValue]
  }, [])
}
console.log(flatten2([0, [1], [2, [3]]], 1))

/**
 * deep 控制递归深度，例子函数需要递归
 * @param {d} arr
 * @param {*} deep
 */
const flatten = (arr, deep = 1) => {
  return arr.reduce((cur, next) => {
    return Array.isArray(next) && deep > 1
      ? [...cur, ...flatten(next, deep - 1)]
      : [...cur, next]
  }, [])
}

const arr = [1, [2], [3, [4]]]
console.log(flatten(arr, 1)) // [1, [2], [3, [4]]]
console.log(flatten(arr, 2)) // [1，2, [3, 4]]
console.log(flatten(arr, 3)) // [1，2, 3, 4]
