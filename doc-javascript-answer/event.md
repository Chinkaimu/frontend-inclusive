# 事件

## 【medium】解释一下浏览器的事件循环。
* 定义：Event Loop is a programming construct that waits for and dispatches events or message in a program.一个用于等待和发送消息、事件的程序结构。
* 过程描述：
  * 函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs,接着执行同步任务,直到Stack为空;
  * 在此期间WebAPIs完成这个事件，把回调函数放入CallbackQueue中等待;
  * 当执行栈为空时，Event Loop把Callback Queue中的一个任务放入Stack中,回到第1步。
* 补充内容：
  * Event Loop 是由 javascript 宿主环境来实现的
  * WebAPIs 是由 C++ 实现的浏览器创建的线程，处理诸如 DOM事件、http请求、定时器等异步事件
  * JavaScript 的并发模型基于 “事件循环”

## 【medium】概括一下宏任务和微任务的区别。
* macro-task(Task):一个event loop有一个或者多个task队列。任务源宽泛，包括 setTimeout,setInterval,setImmediate,I/O,UI rendering
* micro-task（Job）:一个event loop只有一个 job 队列。执行时间与宏任务也有所差异。每一次执行栈清空先清空微任务，然后从event loop中取出宏任务推入栈中执行作为下一个循环，结束后又清空微任务，直到执行栈，宏任务，微任务全部清空。

## 【easy】说说setInterval、setTimeout、requestAnimationFrame的区别。
* setTimeout 特定时间后将事件加入到 event queue
* setInterval 间隔一段时间就加入一个执行函数到 queue，但是如果event queue中存在，那么这次事件回调不会加入进去
* requestAnimationFrame 告诉浏览器希望之星一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画
* setTimeout 、setInterval 与 requestAnimationFrame 回调函数加入的队列不是同一个，requestAnimationFrame 执行在微任务之后需要先判断是不是重绘事件，如果是，就从动画队列中逐个取出执行完成然后再重绘。

## 【easy】setInterval会有什么问题，该怎么解决？
《JS高级程序设计》setInterval 重复的定时器只有在任务队列中没有该定时器的任何代码时，才会被添加到队列。使得存在如下问题：
* 某些间隔会被跳过
* 多个定时器代码之间的执行间隔会比预期小
所以我们通常用链式调用 setTimeout 来避免这2个缺点。

## 【medium】如下代码的输出结果是什么？
```
  console.log('script start')

  setTimeout(function () {
    console.log('setTimeout')
  }, 0)

  const p = Promise.resolve().then(function () {
    console.log('promise1')
  })
  p.then(function () {
    console.log('promise2')
  })

  console.log('script end')
```
// script start script end promise1 promise2 setTimeout