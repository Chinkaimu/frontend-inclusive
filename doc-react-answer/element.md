# Element

## 什么是 React Element，该如何判断？
## 为什么 React 组件的首字母需要大写？
## 在React中为何能够支持jsx语法
## 类组件的render方法执行后最终返回的结果是什么
## 手写代码实现一个createElement方法
## 如何判断一个对象是不是React Element


## 在React中为何能够支持jsx语法
  * JSX 是 JS 的语法扩展，是使用 XML 语法编写 JavaScript 的一种语法糖。在 React 中，所有的组件的渲染功能都依靠 JSX，利用了 JS 的表现力和类似 HTML 的模版语法。
  * Bebel 的预置工具包 @babel/preset-react 中 2 个核心插件 @babel/plugion-syntax-jsx， @babel/plugin-transform-react-jsx 会将我们的 JSX 代码最终转化成 React.createElement.
  * JSX 不可以渲染对象，但是可以渲染 数组、false、true、0。undefined 不可以。

## 参考文档：
[React16源码解读：开篇带你搞懂几个面试考点](https://juejin.im/post/5dff334851882579dc6f8167)