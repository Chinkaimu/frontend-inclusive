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

Function.prototype.apply2 = function (context, param) {
  context = context || window || new Object(context)
  const key = Symbol()
  context[key] = this
  const result = context[key](...param)
  delete context[key]
  return result
}

testCall.apply2(obj, [1, 2, 3])
