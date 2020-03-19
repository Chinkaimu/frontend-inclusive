/**
 * 数组去重：
 *  输入数据 [1,1,2,2,3,3,4,4,5]
 *  输入数组 [3,1,2,3,2,2,1,1,3]
 */
function duplicateRemove1 (arr) {
  return Array.from(new Set(arr))
}
console.log(duplicateRemove1([1, 1, 2, 2, 3, 3, 4, 4, 5]))
console.log(duplicateRemove1([3, 1, 2, 3, 2, 2, 1, 1, 3]))

function duplicateRemove2 (arr) {
  return arr.reduce((accumulator, item) => {
    return accumulator.includes(item)
      ? accumulator
      : [...accumulator, item]
  }, [])
}
console.log(duplicateRemove2([3, 1, 2, 3, 2, 2, 1, 1, 3]))
