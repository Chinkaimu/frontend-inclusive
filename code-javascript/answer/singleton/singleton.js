// 经典的单例模式，通过 Proxy 拦截对象重写 construct 方法，如果不存在实例则新建，如果已经存在则返回原来的实例
// 参考文档：https://segmentfault.com/a/1190000012842251
// 参考文档：https://juejin.im/post/5d48135cf265da03e61af683#heading-5

// Proxy 代理，重写 construct
function singleProxy (func) {
  let instance
  // ? 因为用了闭包所以 instance 在生成一次后会一直存在？
  const handler = {
    construct (target, args) {
      if (!instance) {
        // 通过 Reflect 可以方便地调用默认方法，而不需要调用函数本身默认方法并传入 target
        // Reflect 修正了一些不合理的返回值
        instance = Reflect.construct(func, args)
      }
      return instance
    }
  }
  return new Proxy(func, handler)
}

const SingleClass = singleProxy(function (name) {
  this.name = name
})

const obj1 = new SingleClass('hello')
const obj2 = new SingleClass('world')
console.log(obj1 === obj2)
console.log(obj2.name)

// 包一层匿名函数，返回闭包
function CreateSingleton (name) {
  this.name = name
  this.getName()
}

CreateSingleton.prototype.getName = () => {
  return this.name
}

const Singleton = (function () {
  let instance
  return function (...args) {
    if (!instance) {
      // 赋值给 instance
      instance = new CreateSingleton(...args)
    }
    return instance
  }
})()

const single1 = new Singleton('my')
const single2 = new Singleton('name')
console.log('single1 === single2', single1 === single2)
