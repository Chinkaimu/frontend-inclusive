/**
 * Set 类似于数组，但成员值都是唯一的，无重复。
 * set + Array.from
 */
function unique1 (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('type error!')
  }

  // 也可以用扩展运算符
  return Array.from(new Set(arr))
}
console.log(unique1([1, 1, 2, 2, 3]))

/**
 * Map 类似于Object，但 key 值可以是任意类型，保持唯一性。
 * 比第一种方法更强的是可以增加参数，对对象数组进行去重
 */
function unique2 (arr, key) {
  if (!Array.isArray(arr)) {
    throw new Error('type error!')
  }

  if (!key) {
    return [...new Map(arr.map((item) => [item, item])).values()]
  }
  return [...new Map(arr.map((item) => [item[key], item])).values()]
}
console.log(unique2([1, 1, 2, 2, 3]))
const singers = [
  { id: 1, name: 'Leslie Cheung' },
  { id: 1, name: 'Leslie Cheung' },
  { id: 2, name: 'Eason Chan' }
]
console.log(unique2(singers, 'id'))

/**
 * indexOf
 */
function unique3 (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('type error!')
  }

  const result = []
  for (let i = 0; i < arr.length; i++) {
    if (result.indexOf(arr[i]) === -1) {
      result.push(arr[i])
    }
  }
  return result
}
console.log(unique3([1, 1, 2, 2, 3]))

function unique4 (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('type error!')
  }

  return Array.prototype.filter.call(arr, (item, index) => {
    return arr.indexOf(item) === index
  })
}
console.log(unique4([1, 1, 2, 2, 3]))
