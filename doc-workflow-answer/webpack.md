# webpack
## 【easy】async 经过 webpack 打包后是什么？

## 【easy】webpack 中的 mainfest.json 文件什么作用？
* 存储运行时

## 【easy】webpack 常用的插件有哪些？
* HtmlWebpackPlugin
* ManifestPlugin
* SplitChunksPlugin：去重和分离 chunk
* ProvidePlugin：在 webpack 编译的每个模块中，通过访问一个变量来获取一个 package。

## 【medium】 webpack 如何进行性能优化？
* tree shaking 删除没有意义的
* 代码分离，把代码分离到不同的 bundle 中，然后按需加载或并行加载这些文件。代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，如果使用合理，可以极大影响加载时间。
  * 入口起点手动分离
  * 使用 optimization.splitChunks 配置选项，删除重复的依赖项。如将 lodash 从主 bundle 中移除，分离到一个单独的 chunk 中。
  * 动态导入
  * 预取/预加载模块

## 【easy】什么是 webpack 的代码分割？

## webpack与grunt、gulp的不同？


## 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
## 有哪些常见的Loader？他们是解决什么问题的？
## 有哪些常见的Plugin？他们是解决什么问题的？
## Loader和Plugin的不同？
## webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
## 是否写过Loader和Plugin？描述一下编写loader或plugin的思路？
## webpack的热更新是如何做到的？说明其原理？
## 如何利用webpack来优化前端性能？（提高性能和体验）
## 如何提高webpack的构建速度？
## 怎么配置单页应用？怎么配置多页应用？
## npm打包时需要注意哪些？如何利用webpack来更好的构建？
## 如何在vue项目中实现按需加载？

参考链接：
* [关于webpack的面试题总结](https://zhuanlan.zhihu.com/p/44438844)

