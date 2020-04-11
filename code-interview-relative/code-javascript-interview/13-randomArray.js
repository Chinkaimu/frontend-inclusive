/**
 * 给定一个数组，输出随机乱序结果。
 * 思路：
 *    复杂度 O(n^2)
 *    1. 随机产生（ 0 - len） 的下标，Math.floor(Math.random()*len)
 */
function randomArray (arr) {
  const result = []

  while (arr.length > 0) {
    const temp = Math.floor(Math.random() * arr.length)
    result.push(arr.splice(temp, 1)[0])
  }

  return result
}

console.log(randomArray([1, 2, 3, 4, 5]))
