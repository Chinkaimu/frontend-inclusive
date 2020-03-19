/**
 * 数组扁平化，[1,2,[3,4],[5,[6,[7]]]] 输出 [1,2,3,4,5,6,7]
 * 思路：
 *  1. toString 转字符串，返回内容会包含逗号分隔的每一个元素。需要注意的是 返回的元素是字符串形式，需要再转化成数字。(当一个数组被作为文本值或者进行字符串连接操作时，将会自动调用其 toString 方法。)
 *  2. 递归，碰到数组就继续扁平化得到结果返回，在与前面的结果合并（可以引用 reduce）
 */

const param = [1, 2, [3, 4], [5, [6, [7]]]]
function flattern1 (array) {
  return array.toString().split(',').map(item => +item)
}
console.log('flattern1', flattern1(param))

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
