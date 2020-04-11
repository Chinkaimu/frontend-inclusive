/**
 * 实现类似Jquery的链式调用 例如：$('div').addClass('add-class')
 * 原理：
 *  链式调用就是让一个类的每个方法都返回 this，从而达到链式调用
 * 步骤：
 *  首先创建一个构造函数，把哪些元素作为数组保存在一个实例属性中，并把所有定义在构造函数上的 prototype 属性指向对象中的方法都返回以调用方法的那个实例引用，那么它就具有了进行链式调用的能力。
 */

function JQuery (selector) {
  this.elements = document.querySelectorAll(selector)
}

JQuery.prototype = {
  eq: function (index) {
    this.elements = [this.elements[index]]
    return this
  },
  css: function (prop, value) {
    this.elements.forEach(function (el) {
      // 动态设置属性
      el.style[prop] = value
    })
    return this
  },
  show: function () {
    this.css('display', 'block')
    return this
  }
}

// $ 是 JQuery 构建实例的方法
window.$ = function (selector) {
  return new JQuery(selector)
}

// eslint-disable-next-line no-undef
$('duv').eq(0).css('width', '200px').show()
