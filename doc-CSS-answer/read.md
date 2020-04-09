# CSS 相关面试题

## rem 和 em 的区别。
* em 是基于父级元素的 font-size 进行大小计算的。
* rem 是基于根节点（<html>）的 font-size 进行大小计算的。
  * 为了兼容不支持 rem 的浏览器，我们需要在 rem 前面写上对应的 px 值，这样不支持的浏览器可以优雅降级。
* px像素（Pixel）。相对长度单位。像素 px 是相对于显示器屏幕分辨率而言的。
* 使用选择：对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可。对于需要适配各种移动设备，使用rem，例如只需要适配iPhone和iPad等分辨率差别比较挺大的设备。

## 如何进行三栏布局？
* 使用父元素设置 display: flex； 左右设置固定宽度，不放大不缩小， flex: 0 0 150px; 中间栏自动放大缩小 flex: 1; （flex: 1 1 0%）。