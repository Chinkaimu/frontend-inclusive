# component

## React.PureComponent 与 React.Component 的区别？
## React.PureComponent 可能存在的问题？如何避免？
## 如何通过代码区分Component和PureComponent？
## React.PureComponent 与 React.Component 在实现上有什么关系吗？（tips：完全重写还是继承 => 然后就可能进入继承环节了）
## 类组件和函数组件的区别？
## 如何通过代码区分类组件和函数组件？
## 什么是高阶组件，其作用是什么？
## 如何区分类组件和函数定义组件

## React.PureComponent 与 React.Component 的区别？
* 两者的区别在于 React.Component 并未实现 shouldComponentUpdate()，而 React.PureComponent 中以浅层对比 prop 和 state 的方式来实现了该函数。
* 如果赋予 React 组件相同的 props 和 state，render() 函数会渲染相同的内容，那么在某些情况下使用 React.PureComponent 可提高性能。

## React.PureComponent 可能存在的问题？如何避免？
* React.PureComponent 中的 shouldComponentUpdate() 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 props 和 state 较为简单时，才使用 React.PureComponent，或者在深层数据结构发生变化时调用 forceUpdate() 跳过 shouldComponentUpdate() 来确保组件被正确地更新。也可以考虑 immutable 对象加速嵌套数据的比较。

## 如何通过代码区分 Component 和 PureComponent？
* PureComponent 拥有原型属性 isPureComponent = true。

## React.PureComponent 与 React.Component 在实现上有什么关系吗？（tips：完全重写还是继承 => 然后就可能进入继承环节了）
* PureComponent 继承了 Component 的方法。

## 类组件和函数组件的区别？
* 1.语法上：函数组件是一个纯函数，它接收一个props对象返回一个react元素。而类组件需要去继承React.Component并且创建render函数返回react元素，这将会要更多的代码，虽然它们实现的效果相同。
* 2.状态管理：因为函数组件是一个纯函数，你不能在组件中使用setState()，所以在 React16 以前函数组件无状态组件。React 16 后引入了 hooks 可以让函数组件拥有状态。
* 3.生命周期：React16 之前函数组件没有生命周期周期，16 之后通过 hooks 引入了生命周期。
* 4.调用方式：函数组件重新渲染将重新调用组件方法返回新的react元素，类组件重新渲染将new一个新的组件实例，然后调用render类方法返回react元素，这也说明为什么类组件中this是可变的。
* 5.[Mark]获取渲染时的值：React 函数总是获取它们渲染时的值
参考文档：https://segmentfault.com/a/1190000020861150


## 如何通过代码区分类组件和函数组件？（不读源码不知道吧，平常也不会去区分是不是类组件）
* React.component 有一个原型属性 isReactComponent 是 {}，可以通过此区分累组件和函数组件。

## 什么是高阶组件，其作用是什么？

## 参考文档：
[React16源码解读：开篇带你搞懂几个面试考点](https://juejin.im/post/5dff334851882579dc6f8167)