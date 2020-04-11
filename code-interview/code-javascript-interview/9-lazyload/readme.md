# 知识点
  * 获得文档的根元素： document.documentElement
  * 元素内部的高度： Element.clientHeight
  * IE 可见区域高度： document.documentElement.clientElement
  * 元素的内容垂直滚动的像素值（被卷去的高度）：Element.scrollTop
  * 当前元素相对于 offsetParant 元素的顶部边界距离：Element.offset
  * 图片出现在视口的条件： offset < clientHeight + scrollTop