/**
 * 一维数组中连续相同的数字转换成二维
 * 例如：[1,1,2,3,3,3,3,4,5,5,5,6,6] 将被转换为 [[1,1],2,[3,3,3],4,[5,5,5],[6,6]]
 */
// finish by myself
function arrayTo2D (arr) {
  if (!arr || !arr.length) return []
  let current = [arr[0]]
  const result = []

  for (const item of arr) {
    if (item === current[current.length - 1]) {
      current.push(item)
    } else {
      current.length > 1 ? result.push(current) : result.push(current[0])
      current = [item]
    }
  }
  return result
}

console.log(arrayTo2D([1, 1, 2, 3, 3, 3, 3, 4, 5, 5, 5, 6, 6]))
