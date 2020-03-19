/**
 * 编写函数createArray(holder, length)返回长度为length，成员都是holder的数组
 */
function createArray1 (holder, length) {
  const result = new Array(length)
  // 用一个固定之填充数组从索引其实到终止索引内的全部元素，不包括终止索引
  // Array.prototype.fill(value, start, end)
  result.fill(holder)
  return result
}

// eslint-disable-next-line no-unused-vars
function createArray2 (holder, length) {
  const result = []
  while (length--) {
    result.push(holder)
  }
  return result
}

console.log(createArray1(1, 4))
