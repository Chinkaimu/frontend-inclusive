/**
 * 判断是不是数组
 */

function isArray (obj) {
  return Object.prototype.toString.call(obj) === '[object Array]'
}

console.log(isArray([1, 2]))
