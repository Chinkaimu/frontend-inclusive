# Component

## PureComponent
用于性能优化的手段，通过 shallowEqual 实现了 shouldComponentUpdate() ，减少了浅层不必要的更新。但是不能用于深层的组件结构，子组件可能会出现不能更新的 bug。