# 生命周期

## 【very easy】React 的生命周期有哪些？
16版本前：
* 挂载及销毁阶段：
  * 初始化：constructor 内获取初始化状态、属性。或者 getDefaultProps 以及 getInitialState.
  * 挂载前：componentWillMount
  * 渲染：render
  * 挂载后：componentDidMount
  * 卸载前：componentWillUnmount
* 更新阶段
  * componentWillReceiveProps：组件将要接受到属性的时候调用（如果一开始调用就传入了props，那么其实会渲染2次。第一次使用的是默认props）
  * shouldComponentUpdate：组件坚守到新属性或者状态的时候，返回false阻止render调用
  * componentWillUpdate：组件即将更新不能修改属性和状态
  * render：组件重新描绘
  * componentDidUpdate：组件已经更新
16版本后：
* componentWillReceiveProps、componentWillUpdate、componentDidUpdate 不再推荐使用
* 取而代之的是
  * static getDrivedStateFromProps：执行在 render 之前，不管是挂载还是更新。 
    * componentWillMount 即将过时，应该避免使用
  * getSnapshotBeforeUpdate：在更新阶段最近一次渲染输出（提交到 DOM 节点）之前调用。
    * componentWillReceiveProps、componentWillUpdate 即将过时，应该避免使用

## 【medium】为什么要推出新的生命周期，优势在哪里？
强迫开发者将 side effects 移入 commit 阶段的生命周期函数中，在流程上控制 React 被更加正确合理地使用。
参考文档： 
https://juejin.im/post/5c7e24b26fb9a049f746f084（推荐）
https://juejin.im/post/5aca20c96fb9a028d700e1ce

老生命周期的弊端： componentWillReceiveProps 往往用于实现通过 props 更新 state 的功能。但 componentWillReceiveProps 只在 Updating 中 props 更新时被调用，无法覆盖所有场景。比如 Mounting 时需要在 contructor 中用 props 初始化 state。故需要使用多个生命周期函数才能实现 props 更新 state 这一单一功能。而 React16 中新提出来的 getDerivedStateFromProps 函数覆盖了所有 state 更新的场景。



## 【easy】哪些生命周期不适合调用 setState，为什么？
在初始化没必要调用；本次循环的状态数据还没有完全 ready （开始构建 虚拟DOM）或者本次渲染循环的数据已经消耗（commit 阶段）这 2 种情况，可以进入下一轮状态渲染循环的时候可以进行状态修改，否则不能修改。所以初始化 constructor 的时候，shouldComponentUpdate，componentWillUpdate，render 是不能调用 this.setState 的。