# Introduction
Webpack 是现代 JavaScript 应用程序的静态模块打包工具。当 Webpack 处理应用程序时，会在内部构建一个依赖图，映射项目所需的每个模块，并生成一个或多个 bundle.
[Webpack](https://webpack.js.org/) is a `static module bundler` for modern JavaScript applications. When webpack processes your application, it internally builds a dependency graph which maps every module your project needs and generates one or more bundles.


# Why and when should I use webpack ?
随着前端功能的复杂，我们有必要将各功能代码分割 split code 实现模块化，开发和维护的时候我们能够更加关注一部分功能及模块，降低开发和维护的成本。开发的时候代码分开写，运行前组装回去就是静态模块打包工具的功能。如果不运行前组装回去，就需要运行时各模块间依赖调用。
(I had a hard time grasping why I would use Webpack, but, I didn't know why. 
Finally I got it, the most serious problem is that I even had not generated the question while there are many vague ideas in my thinking. Therefore, reading the document in official website again and again helped me nothing.
The second problem is that my ideas are reasonable, but, I hadn't think further. Then I was blocked. I should implement my idea, and than I will konw why.)
Split many codes into modules for better organized and cooperation, after developed, bundle all up into a single file,. The dependencies are dealt by the modules, or we have to manage them with redundant programming. Here is the answer [Why would I use a Webpack?](http://tinselcity.net/whys/packers). I analyze the block reason is my tunnel view just in small files.

# 为什么不使用诸如 Gulp 之类的打包工具？
Grunt，gulp 任务执行器，将所有文件拼接在一起。通过 IIFE 解决作用域冲突问题；拼接可以做到很容易地跨文件重用脚本，但是却使构建结果的优化变得更加困难。

# How to use it ?
## 核心概念
* entry：指示 webpack 应该使用哪个模块，来作为构建其内部 依赖图(dependency graph) 的开始。
* output：控制 webpack 如何向硬盘写入编译文件。
* loader：对模块的源代码进行转换。
* resolve：resolver 帮助 webpack 从每个如 require/import 语句中，找到需要引入到 bundle 中的模块代码。

## manifest
* webpack 的 runtime 和 manifest 管理`所有模块的交互`，这是 webpack 构建的典型应用或站点中的三类主要代码类型之一。当 compile 开始执行、解析和映射应用程序时，它会保留所有模块的详细要点，这个集合就是 manifest ，数据清单， 当完成打包并发送到浏览器时，runtime 会通过 manifest 来解析和加载模块。
* runtime 及 伴随的 manifest 数据，主要是指：在浏览器运行过程中，webpack 用来链接模块化应用程序所需的所有代码。包含：链接模块所需的加载和解析逻辑。（？？可是我只有一个 bundle，所有的关联不是都已经打包的一个文件了吗？？我们应用程序的资源不只有 bundle，还有图片等其他各种资源。）

## 模块热替换
* 模块热替换功能(HMR - hot module replace)功能会在应用程序运行过程中，替换、添加或删除模块，而无需重新加载整个页面。
  * 保留在完全重新加载页面期间丢失的程序状态
  * 只更新变更内容
  * 在源码中修改 CSS/JS 可以立刻在浏览器中更新

## 缓存
* 将第三方库提取到单独的 vendor chunk 文件中，是比较推荐的做法，因为他们很少像本地的源代码那样需要频繁修改。

# How to advanced use ?
