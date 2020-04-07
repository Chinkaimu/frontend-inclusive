# setState
* 参考文档：
  * [setState的执行机制](https://johninch.github.io/Roundtable/Question-Bank/react/setState.html#setstate)
  * [React之setState原理分析](http://blog.poetries.top/2018/12/20/react-setState/)

## 为什么直接修改 this.state 无效。
* 要知道setState本质是通过一个队列机制实现state更新的。 执行setState时，会将需要更新的state合并后放入状态队列，而不会立刻更新state，队列机制可以批量更新state。
* 如果不通过setState而直接修改this.state，那么这个state不会放入状态队列中，下次调用setState时对状态队列进行合并时，会忽略之前直接被修改的state，这样我们就无法合并了，而且实际也没有把你想要的state更新上去。

## 简述一下 setState 后做了什么？
* 如果我们在 React 的生命周期和合成事件中调用 setState，此时 React 仍然处于它的批处理更新机制中(生命周期的 pre 钩子会将 isBatchingUpdates 设置为 true)，这时会将要更新的 state 存入到 _pendingStateQueue，将要更新的组件存入到 dirtyComponent。当上一次更新机制执行完毕后，批处理标志 batchUpdate 设置为 false。这时将取出 dirtyComponent 中的组件以及 _pendingStateQueue 中的 state 进行更新，会重新调用 render 方法，批量更新机制也会重新被设置为 true。
* 如果在异步代码中调用 setState，如 setTimeout 的回调函数中调用 setState，根据 JS 的异步机制，异步代码会被 push 到事件队列中，所有的同步代码执行完毕后才会执行，这时 React 的批量处理机制已经完成，批处理标志被设置为 false，这时调用 setState 会立即执行。

## 如何取到 setState 更新后的 state 值？
* 从 setState 传入的第二个参数 —— 回调函数中获取更新后的 state。

## 为什么有时连续多次setState只有一次生效？
* React 会将批处理机制中存储的多个 setState 进行合并，类似于 Object.assign()。


## 如何设计购物车组件的 state？