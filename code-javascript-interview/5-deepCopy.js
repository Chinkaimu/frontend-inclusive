/**
 * 深拷贝：重点处理引用类型
 * @param {*} target
 */

const target = {
  [Symbol('foo')]: 1,
  field1: 1,
  field2: undefined,
  field3: 'str',
  field4: [1, 3, [1, 2]],
  obj: {
    value: 'hello',
    o: {
      value: '2'
    }
  }
}
target.target = target

// 递归，终止条件是 原始类型
function deepCopy1 (target, map = new WeakMap()) {
  if (typeof target === 'object') {
    const cloneTarget = Array.isArray(target) ? [] : {}

    if (map.get(target)) {
      return map.get(target)
    }
    map.set(target, cloneTarget)

    for (const key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        cloneTarget[key] = deepCopy1(target[key], map)
      }
    }

    Object.getOwnPropertySymbols(target).forEach(item => {
      cloneTarget[item] = deepCopy1(target[item], map)
    })

    return cloneTarget
  } else {
    return target
  }
}
console.log(deepCopy1(target))

// eslint-disable-next-line no-unused-vars
function isObject (target) {
  const type = typeof target
  return target !== null && (type === 'object' || type === 'function')
}

function getType (target) {
  return Object.prototype.toString.call(target)
}

const mapTag = '[object Map]'
const setTag = '[object Set]'
const arrayTag = '[object Array]'
const objectTag = '[object Object]'

const boolTag = '[object Boolean]'
const dateTag = '[object Date]'
const errorTag = '[object Error]'
const numberTag = '[object Number]'
const regexpTag = '[object RegExp]'
const stringTag = '[object String]'
const symbolTag = '[object Symbol]'
const functionTag = '[object Function]'

const deepTag = [mapTag, setTag, arrayTag, objectTag]

function getInit (target) {
  const constructor = target.constructor
  return new constructor()
}

function forEach (array, iteratee) {
  let index = -1
  const length = array.length
  while (++index < length) {
    iteratee(array[index], index)
  }
}

function cloneSymbol (target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

function cloneReg (target) {
  const reFlags = /\w*$/
  const result = new target.constructor(target.source, reFlags.exec(target))
  result.lastIndex = target.lastIndex
  return result
}

// new Function([arg1, arg2, ...argN], functionBody)

function cloneFunction (target) {
  const funcString = target.toString()
  const bodyReg = /(?<={)(.|\n)+(?=})/m
  const paramReg = /(?<=\().+(?=\)\s+{)/

  if (target.prototype) {
    const param = paramReg.exec(funcString)
    const body = bodyReg.exec(funcString)
    if (body) {
      if (param) {
        const paramArr = param[0].split(',')
        // eslint-disable-next-line no-new-func
        return new Function(...paramArr, body[0])
      } else {
        // eslint-disable-next-line no-new-func
        return new Function(body[0])
      }
    } else {
      return null
    }
  }
}

function deepCopyOtherType (target, type) {
  const Ctor = target.constructor
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(target)
    case regexpTag:
      return cloneReg(target)
    case symbolTag:
      return cloneSymbol(target)
    case functionTag:
      return cloneFunction(target)
    default:
      return null
  }
}

function deepCopy2 (target, map = new Map()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target
  }

  // 克隆 object
  const type = getType(target)
  let cloneTarget = null
  if (deepTag.includes(type)) {
    // 初始化
    cloneTarget = getInit(target, type)
  } else {
    return deepCopyOtherType(target, type)
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target)
  }
  map.set(target, cloneTarget)

  // 克隆 set：类似于数组，但是没有重复的值
  if (type === setTag) {
    target.forEach(value => {
      cloneTarget.add(deepCopy2(value, map))
    })
  }

  // map 类型
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, deepCopy2(value, map))
    })
  }

  // 数组或对象
  const keys = type === arrayTag ? undefined : Object.keys(target)
  forEach(keys || target, (value, key) => {
    // 对象
    if (keys) {
      key = value
    }
    cloneTarget[key] = deepCopy2(target[key], map)
  })
  return cloneTarget
}

console.log(deepCopy2(target))
