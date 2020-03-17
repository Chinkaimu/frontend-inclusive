/**
 * var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
 * 编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组
 */
// 思路：递归将数组中内容取出返回

const arr = [[1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14]]]], 10]

const flatten = (arr) => {
  return arr.reduce((accumulator, currentValue) => {
    return Array.isArray(currentValue)
      ? [...accumulator, ...flatten(currentValue)]
      : (accumulator.includes(currentValue)
        ? [...accumulator]
        : [...accumulator, currentValue])
  }, [])
}

// sort compareFunction(a, b) 小于 0 ， 那么 a 会被排在 b 的前面
const result = Array.from(new Set(flatten(arr))).sort((a, b) => a - b)
console.log(result)
