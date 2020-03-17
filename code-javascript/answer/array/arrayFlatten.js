/**
 * Transfer through string.
 */
const flatten1 = (arr) => arr.toString().split(',').map(item => +item)
console.log(flatten1([0, [1], [2, [3]]]))

/**
 * reduce + recursion + spread operator
 */
const flatten2 = (arr) => {
  // reduce 上一次的结果，加上当前结果
  return arr.reduce((accumulator, currentValue) => {
    return Array.isArray(currentValue)
    // key point: spread the result
      ? [...accumulator, ...flatten2(currentValue)]
      : [...accumulator, currentValue]
  }, [])
}
console.log(flatten2([0, [1], [2, [3]]], 1))

const flatten3 = (arr) => {
  const result = []
  for (const item of arr) {
    if (Array.isArray(item)) {
      // 将一个或多个元素添加到数组的末尾
      result.push(...flatten3(item))
    } else {
      result.push(item)
    }
  }
  return result
}

console.log('flatten3', flatten3([0, [1], [2, [3]]], 1))

/**
 * deep 控制递归深度，例子函数需要递归
 * @param {d} arr
 * @param {*} deep
 */
const flatten = (arr, deep = 0) => {
  return arr.reduce((cur, next) => {
    return Array.isArray(next) && deep > 0
      ? [...cur, ...flatten(next, deep - 1)]
      : [...cur, next]
  }, [])
}

const arr = [1, [2], [3, [4]]]
console.log(flatten(arr, 0)) // [1, [2], [3, [4]]]
console.log(flatten(arr, 1)) // [1，2, [3, 4]]
console.log(flatten(arr, 2)) // [1，2, 3, 4]
