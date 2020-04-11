/**
 * 数组扁平化，[1,2,[3,4],[5,[6,[7]]]] 输出 [1,2,3,4,5,6,7]
 * 思路：
 *  1. toString 转字符串，返回内容会包含逗号分隔的每一个元素。需要注意的是 返回的元素是字符串形式，需要再转化成数字。(当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。)
 *  2. 递归，碰到数组就继续扁平化得到结果返回，在与前面的结果合并（可以引用 reduce）
 */

// eslint-disable-next-line no-unused-vars
// 最好不要使用，不适用于数组内存在对象的情况
const param = [1, 2, [3, 4], [5, [6, [7]]]]
// eslint-disable-next-line no-unused-vars
function flattern1 (array) {
  return array.toString().split(',').map(item => +item)
}
// console.log('flattern1', flattern1(param))

// eslint-disable-next-line no-unused-vars
function flattern2 (array) {
  // TODO: 不能忘记返回数据。 array.reduce() 对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
  return array.reduce((accumulator, currentValue) => {
    // 回调函数里面也需要返回数据，不要忘记
    return Array.isArray(currentValue)
      ? [...accumulator, ...flattern2(currentValue)]
      : [...accumulator, currentValue]
  }, [])
}
console.log('flattern2', flattern2(param))

// 栈方法： 让前面的先一个个执行，所以先把后面的内容 push 到栈中，只要存在内容就继续 push 进去，然后 pop 出来
function flattern3 (arr) {
  if (!arr || !arr.length) return []

  const stack = [arr]
  const result = []

  while (stack.length > 0) {
    const current = stack.pop()

    for (let i = current.length - 1; i >= 0; i--) {
      const item = current[i]
      if (Array.isArray(item)) {
        stack.push(item)
      } else {
        result.push(item)
      }
    }
  }

  return result
}
console.log('flattern3', flattern3([1, [1, [2]], [3, [4]]]))
console.log('flattern3', flattern3(param))
