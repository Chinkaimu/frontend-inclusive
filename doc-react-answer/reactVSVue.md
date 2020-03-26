# React VS Vue
## 相似之处
  * 使用了 Virtual DOM；
  * 提供了响应式和组件化的视图组件；
  * 将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关的库
## 不同之处
  * React 比 Vue 更好的地方，数据流向更清晰，有更丰富的生态系统。
  * Vue 比 React 更好的地方，概念少门槛低，代码更少更易用。
  * 【数据驱动视图】的原理不同，造成工作方式不同：
    * React 的工作逻辑是： state 只能通过 setState 改变，而 state 变化会执行 render，即是一个单向数据流的 M -> V 的视图库。（如果要添加 V -> M 反向绑定，需要手动添加 onChange 事件，绑定 handler 改变 setState ，重新触发渲染。）React 的 state 存在于一个个组件中，并不能叫做 VM。
    * Vue 的工作逻辑是： 通过数据劫持和发布订阅结合，实现双向绑定。 Vue 中不存在类似 setState 这种唯一改变状态变量途径的方法，而是通过 vm 自动为数据 Model 添加监听，在数据改变时调用订阅的监听回调改变 View，触发 render；另一个方面（vue 比 react 多做的事），例如表单的场景下，又能通过 v-model 自动完成 View 层的事件绑定，触发数据 module 的变化。
