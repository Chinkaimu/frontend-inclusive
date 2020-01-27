function testCall (...res) {
  console.log(this.name)
  console.log(res)
  this.output()
}

const obj = {
  name: 'chm',
  output: () => {
    console.log('output')
  }
}

// 思想：让函数成为传入对象的属性方法进行调用，则函数中使用的this都会替换为传入对象的this
// 参考文档：https://github.com/mqyqingfeng/Blog/issues/11
// 参考文档：https://juejin.im/post/5e24590ef265da3e152d27bc#heading-0
// eslint-disable-next-line no-extend-native
Function.prototype.myCall = function (context, ...args) {
  context = (context || window) || new Object(context)
  // TODO: 复习Symbol规则
  const key = Symbol()
  context[key] = this
  const result = context[key](...args)
  delete context[key]
  return result
}
testCall.myCall(obj, 1, 2, 3)
