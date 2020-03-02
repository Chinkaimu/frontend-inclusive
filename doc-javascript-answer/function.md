# 函数

## 【easy】求如下返回结果
```
  ['10','10','10','10','10'].map(parseInt);
```
* 需要理解 map 入参数分别是 item[, index[, array]]，而 parseInt 的参数分别是 string[, radix]，字符串转化为 radix( 2-36 ) 进制的整数，输出是 10 进制的整数或者 NaN。解析内容都是 '10'，进制分别是 0，1，2，4。
* 需要考虑 radix 为 undefined 或者为 0 的特殊情况，
  * 如果字符串 string 以"0x"或者"0X"开头, 则基数是16 (16进制).
    如果字符串 string 以"0"开头, 基数是8（八进制）或者10（十进制），那么具体是哪个基数由实现环境决定。ECMAScript 5 规定使用10，但是并不是所有的浏览器都遵循这个规定。因此，永远都要明确给出radix参数的值。
    如果字符串 string 以其它任何值开头，则基数是10 (十进制)。
* 所以结果应该是 [10, NaN, 2, 4]
参考文档：https://muyiy.cn/question/js/2.html

## 【medium】什么是防抖和节流？有什么区别？如何实现？
* 防抖：某定时事件在 n 时间后执行具体操作，如果在 n 时间内这个事件被再次触发，则该事件重新计时，保证事件不会连续执行，连续触发（都在上一次的 n 事件间隔内）的事件最多执行 1 次。
  * 常用场景：定时器执行事件内再次触发则会重新计时，那么事件结果应该是以最后一次为准（存在无限循环的可能性）。常用于 窗口resize、搜索联想等等。
  * 实现：新的事情触发时，把上一次的计时器清空，重新定义个定时器。
    * debounce 函数，参数为 执行函数、定时时间
    * 定义定时器 timer
    * 返回匿名函数，函数参数为 执行函数参数。该匿名函数清空定时器 timer，然后定义新的定时器赋值给 timer
  * [查看代码](https://github.com/zhihuibaobao/frontend-zero/blob/master/code-javascript/answer/debounce)
* 节流：某定时事件在 n 时间后执行具体操作，如果在 n 时间内这个事件被再次触发无效，保证一个时间段内只有一次真正触发生效。
  * 常用场景：由于 n 事件内只有一次生效，而不是最后一次。可用于 表单提交、滑倒底部加载更多等。
  * 实现：可以通过定时器判断实现，在事件执行后清空定定时器，每次新的事件触发先判断前一个定时器是否清空，如果未清空，事件触发无效；也可以通过时间间隔进行判断（根据[Event Loop]的工作原理，通过事件计算不是很准确）；可以两者结合实现。
    * 类似于 debounce,不过在 timer === null 的时候才会设置定时器，并且在执行函数之后需要设置 timer 为 null
  * [查看代码](https://github.com/zhihuibaobao/frontend-zero/tree/master/code-javascript/answer/throttle)
* 参考文档：[7分钟理解JS的节流、防抖及使用场景](https://juejin.im/post/5b8de829f265da43623c4261)

## 【medium】写一个单例模式的代码。

## 【medium】实现 instanceof

## 【medium】简单实现个 promise

## 【medium】实现 call 函数

## 【medium】实现 apply 函数

## 【medium】实现 bind 函数

## 【medium】实现函数重载

