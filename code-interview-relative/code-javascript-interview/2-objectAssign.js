/**
 * Object.assign(target, source)
 * 将所有可枚举属性从一个或多个源对象复制到目标对象
 * */
const o1 = { a: 1 }
const o2 = { [Symbol('foo')]: 2 }

const obj = Object.assign({}, o1, o2)
console.log(obj)
console.log(Object.getOwnPropertySymbols(obj))

const obj1 = Object.create({ foo: 1 }, {
  bar: {
    value: 2
  },
  baz: {
    value: 3,
    enumerable: true
  }
})
const copy = Object.assign({}, obj1)
console.log(copy)

function assign (target, ...args) {
  if (target === null) {
    throw new TypeError('Cannot convert undefined or null to object')
  }

  const to = Object(target)

  for (var index = 0; index < args.length; index++) {
    const nextSource = args[index]

    if (nextSource !== null) {
      // for in 遍历对象及原型链上的可枚举属性
      /**
       * Object.keys.array.forEach(element => {
       });
       */
      for (const nextKey in nextSource) {
        // 之所以用的是 Object.prototype 的原型因为 nextSource 可能是普通类型
        if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
          to[nextKey] = nextSource[nextKey]
        }
      }
      const symbols = Object.getOwnPropertySymbols(nextSource)
      if (symbols.length > 0) {
        for (const item of symbols) {
          to[item] = nextSource[item]
        }
      }
    }
  }

  return to
}

const obj2 = assign({}, o1, o2)
console.log('obj2 = ', obj2)
