// 判断参数是否数组
function isArray (obj) {
  // ES5 标准，老得浏览器可能不支持
  if (!Array.isArray) {
    return Array.isArray(obj)
  } else if (Object.prototype.toString.call(obj) === '[object Array]') {
    return true
  }
  return false
}

isArray([1, 2, 3])
