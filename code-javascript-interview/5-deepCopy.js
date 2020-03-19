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
  },
  reg: /\w*$/g,
  syb: Symbol(1)
}
// target.target = target

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

// 再次实现 3 (3.18)

// 可继续遍历的数据类型 5 个，但是 Arguments 不会出现
const SetTag = '[object Set]'
const MapTag = '[object Map]'
const ArrayTag = '[object Array]'
const ArgsTag = '[object Arguments]'
const ObjectTag = '[object Object]' // 非 null

// eslint-disable-next-line no-unused-vars
const iterableTags = [ObjectTag, SetTag, MapTag, ArrayTag, ArgsTag]

// 不可遍历但是要特殊处理的数据类型
const FunctionTag = '[object Function]'
const RegExpTag = '[object RegExp]'
const DateTag = '[object Date]'
const SymbolTag = '[object Symbol]'
// eslint-disable-next-line no-unused-vars
const ErrorTag = '[object Error]'

// 直接返回的原始类型（调用 Object.prototype.toString() 时会自动转成包装类型）
// eslint-disable-next-line no-unused-vars
const NumberTag = '[object Number]'
// eslint-disable-next-line no-unused-vars
const BooleanTag = '[object Boolean]'
// eslint-disable-next-line no-unused-vars
const StringTag = '[object String]'

// 判断是否对象
function isDirectClone (obj) {
  // 不是为 null 的 obj 不能直接拷贝
  if (typeof obj === 'object' && obj !== null) {
    return false
  }
  // function 是 object 但是它的 typeof 是 function。特殊处理
  if (typeof obj === 'function') {
    return false
  }

  return true
}

// 获取对象类型
function getType3 (obj) {
  return Object.prototype.toString.call(obj)
}

// 通过 constructor 属性获得构造函数，构造对象
// eslint-disable-next-line no-unused-vars
function getInit3 (target) {
  const Cons = target.constructor
  return new Cons()
}

function forEach3 (array, iteratee) {
  let index = -1

  while (++index < array.length) {
    iteratee(array[index], index)
  }
}

function cloneFunction3 (target) {
  const paramReg = /(?<=\().+(?=\)\s+{)/
  // m 多行模式
  const bodyReg = /(?<={).|\n+(?=})/m

  const funcString = target.toString()

  if (target.prototype) {
    const param = paramReg.exec(target)
    const body = bodyReg.exec(target)
    if (body) {
      if (param) {
        const paramArray = param[0].split(',')
        // eslint-disable-next-line no-new-func
        return new Function(...paramArray, body[0])
      } else {
        // eslint-disable-next-line no-new-func
        return new Function(body[0])
      }
    } else {
      return null
    }
  } else {
    // eslint-disable-next-line no-eval
    eval(funcString)
  }
}

function cloneRegExp3 (target) {
  // 创建正则表达式除了字面量外可以通过构造函数。 new RegExp(source, flags)
  const result = new RegExp(target.source, target.flags)
  // const reFlags = /\w*$/
  // const result = new target.constructor(target.source, reFlags.exec(target))
  // lastIndex 表示匹配开始的位置，可读取可修改
  result.lastIndex = target.lastIndex
  return result
}

// 包装类型也是直接调用构造函数
function cloneDate3 (target) {
  return new Date(target)
}

// TODO:？？？ 属性是 Symbol 属性，不是值是 Symbol 怎么办？？？
// 目前只是实现了属性值是 Symbol 类型的复制。 如果 key 值是 Symbol ，通过 getOwnPropertySymbols 可以将全部 Symbol 放在最末端。
function cloneSymbol3 (target) {
  return Object(Symbol.prototype.valueOf.call(target))
}

// TODO: 没有考虑包装类型通过 Object.toString 方法判断是会返回包装类型
// 没有考虑包装类型的复制
// 克隆正则，克隆函数等还不会
// 没有处理循环应用
// 可继续遍历的应该统一初始化构造函数
// eslint-disable-next-line no-unused-vars
function deepClone3 (target) {
  // 原始类型直接返回（null 特殊处理，它是 object）
  if (isDirectClone(target)) {
    return target
  }

  const type = getType3(target)
  // TODO: 根据 type 判断是否可继续遍历，可继续遍历的进行初始化

  // set 类型，添加的操作方法是
  if (type === SetTag) {
    const cloneSet = new Set()
    for (const item of target) {
      cloneSet.add(item)
    }
    return cloneSet
  }

  // map 类型
  if (type === MapTag) {
    const cloneMap = new Map()
    for (const key of target.keys()) {
      cloneMap.set(key, target.get(key))
    }
    return cloneMap
  }

  // Symbol 类型
  if (type === SymbolTag) {
    return cloneSymbol3(target)
  }

  // 函数类型
  if (type === FunctionTag) {
    return cloneFunction3(target)
  }

  // 正则
  if (type === RegExpTag) {
    return cloneRegExp3(target)
  }

  if (type === DateTag) {
    return cloneDate3(target)
  }

  // 对象和数组
  const cloneObj = type === ArrayTag ? [] : {}
  const cloneKeys = type === ArrayTag ? undefined : Object.keys(target)
  // TODO: for in 循环可以遍历数组内属性，但是不推荐使用，因为可能遍历到不是数组的内容。参考：https://juejin.im/post/5b2617e5f265da5954425022
  // 所以这里先把 object 的 keys 取出，作为数组统一处理
  forEach3(cloneKeys || target, (value, key) => {
    // TODO:
    if (cloneKeys) {
      key = value
    }
    cloneObj[key] = deepClone3(target[key])
  })
  return cloneObj
}
console.log('deepclone3', deepClone3(target))
