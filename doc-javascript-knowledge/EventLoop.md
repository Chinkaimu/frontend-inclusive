# Event Loop

## [Primary](https://2014.jsconf.eu/speakers/philip-roberts-what-the-heck-is-the-event-loop-anyway.html)
The javascript Runtime can do one thing at a time, but the browser gives us these other things, gives us these we shall APIs, these are effectively threads, you can just make calls to, and those pieces of browser are aware of this concurrency kicks in.

## [advance](https://www.youtube.com/watch?v=u1kqx6AenYw)
A microtask is a promise. There are other things that generate microtasks but 99.9 percent of things that you do is going to be promises.
It has some special properties: first of all, it runs after every task, so you finish a task, then you run the microtask.

## [浏览器事件循环机制](https://juejin.im/post/5afbc62151882542af04112d#heading-3)
Event Loop is a programming construct that waits for and dispatches events or message in a program.一个用于等待和发送消息、事件的程序结构。
事件循环可以简单描述为：
	* 函数入栈，当Stack中执行到异步任务的时候，就将他丢给WebAPIs,接着执行同步任务,直到Stack为空;
	* 在此期间WebAPIs完成这个事件，把回调函数放入CallbackQueue中等待;
	* 当执行栈为空时，Event Loop把Callback Queue中的一个任务放入Stack中,回到第1步。
* Event Loop 是由 javascript 宿主环境来实现的
* WebAPIs 是由 C++ 实现的浏览器创建的线程，处理诸如 DOM事件、http请求、定时器等异步事件
* JavaScript 的并发模型基于 “事件循环”