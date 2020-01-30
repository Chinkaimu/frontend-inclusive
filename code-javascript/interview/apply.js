function testCall (a, b, ...res) {
  console.log(this.name)
  console.log(a)
  console.log(b)
  console.log(res)
  this.output()
}

const obj = {
  name: 'chm',
  output: () => {
    console.log('output')
  }
}

// testCall.apply(obj, [1, 2, 3])

// eslint-disable-next-line no-extend-native
Function.prototype.apply2 = function (context, param) {
  // eslint-disable-next-line no-new-object
  context = context || window || new Object(context)
  const key = Symbol(1)
  context[key] = this
  // the second parameter
  const result = param ? context[key](...param) : context[key]()
  delete context[key]
  return result
}

testCall.apply2(obj)
