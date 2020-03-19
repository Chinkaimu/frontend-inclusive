/**
 * 实现lodash中的get方法：get(target, path, defaultValue)，深度查询一个数组或者对象中的值(数组和对象不止一层嵌套)，查询不到默认返回undefined。
 */

// var _ = require('lodash')
// example
var object = { a: [{ b: { c: 3 } }] }

// console.log(_.get(object, 'a[0].b.c')) // => 3
// console.log(_.get(object, ['a', '0', 'b', 'c'])) // => 3
// console.log(_.get(object, 'a.b.c', 'default')) // => 'default'
// console.log(_.get(object, 'a.b.c')) // => 'default'

/**
 * 思路：
 *  1. 取出 key 值： 可能是跟在点后面，也可能在中括号中。存储到数组中，以便于遍历。
 *  2. 循环遍历取出的 key 值，取出数据
 */
function get (source, path, defaultValue) {
  let result = source
  let paths = path
  if (!Array.isArray(paths)) {
    // [a-z][abc] 在正则中表示字符集，所以 '[]' 要进行转义。 \S 匹配任何非空白字符。 \s 匹配任何空白字符
    // (pattern) 匹配 pattern 并获取，JS 中通过 $1... $9 属性，$ 后面的数字代表第几个括号匹配到的内容。本例子就是替换成第一个括号匹配到的内容。
    paths = path.replace(/\[(\S+)\]/g, '.$1').split('.').filter(key => key !== '')
  }

  for (const key of paths) {
    result = result[key]

    if (!result) {
      return defaultValue
    }
  }

  return result
}

console.log(get(object, 'a[0].b.c')) // => 3
console.log(get(object, ['a', '0', 'b', 'c'])) // => 3
// console.log(get(object, ['a[0]', 'b', 'c'])) // => undefined
console.log(get(object, 'a.b.c', 'default')) // => 'default'
console.log(get(object, 'a.b.c')) // => 'default'
