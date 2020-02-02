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
