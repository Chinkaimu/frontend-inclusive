# babel

## Babel7 的改动
* 移除了之前 state-x 插件
* es2015插件 -> env 插件
* 使用 babel-upgrade 升级，工具本质是将 es2015 换成了 env，stage-x 换成各种 proposal-xxx，并且加上了 @babel 作为新的 babel7 生态统一使用的 scope。

## @babel/plugin-transform-class-properties
* 箭头函数当作 class 属性来看待，属于 Class Field 题案(Stage 3 候选阶段)。
* @babel/plugin-proposal-class-properties 将其进行转化。

## 参考文档
[升级到Babel 7的经验](https://segmentfault.com/a/1190000016541105)