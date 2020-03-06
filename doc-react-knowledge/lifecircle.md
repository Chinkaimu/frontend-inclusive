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

## 【easy】为什么要推出新的生命周期，优势在哪里？


## 【easy】哪些生命周期不适合调用 setState，为什么？