# JS arguments 若干问
掘金链接：https://juejin.im/post/5df34440f265da33c14d135b
### 什么是arguments?属于什么类型？
arguments 是 ***所有非箭头函数*** 内部可访问的局部变量，所有参数复制给该变量对象。它是实参，真正传入的参数，而并非定义函数时的形式参数parameter。它类似于Array，但是除了length和索引属性不具有其他数组属性。通过Object.prototype.toString.call()执行结果我们可以看到它是属于[Object Arguments]，这是一个独立类型Arguments。

```【图1】箭头函数访问arguments报错```
![](https://user-gold-cdn.xitu.io/2019/12/13/16efe45e6bcd506c?w=748&h=153&f=png&s=79829)

### 有些情况下（如函数柯里化）转换成Array对象会更好处理，该如何进行转化呢？
使用Array的原型方法，Array.prototype.slice.call(arguments)，返回新的数组。 

### 为什么Array的原型方法slice能被arguments这么调用呢？
图2[ecma-262规范](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)指出对象类型有length属性即可，会先创建一个新的Array对象，然后对传入的对象进行遍历，所以随意 this 被赋值为 arguments 对象是会返回数组的。

```【图2】Array.prototype.slice(start,end)规范```
![](https://user-gold-cdn.xitu.io/2019/12/13/16efe4a8791138be?w=1428&h=1236&f=png&s=787431)

### 有特殊的参数对象转化为数组，那数组我们怎么转化为参数形式呢？
答案是ES6的 ***扩展运算***。ES6引入了rest参数（形式为…变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。res参数搭配的变量是一个数组，该变量会将**多余**（arguments会得到全部参数）的参数放入到其中。这样的好处是（1）可以使写法更简洁不需要通过Array.prototype.slice去转换成数组， ***在数组要转换成逗号分隔的参数也只需要进行res参数的反运算——扩展运算***；（2）箭头函数不能访问arguments，可以通过res参数获取函数多余的参数；（3）args是声明变量比起arguments函数自带的会好理解很多。需要注意的是res参数后不可有其他参数了，否则会报错。

```【图3】arguments和res参数对比```
![](https://user-gold-cdn.xitu.io/2019/12/13/16efe51575f23af7?w=1322&h=1118&f=png&s=357819)

### arguments还有哪些属性呢？
***callee***，该属性是一个指针，指向拥有这个arguments对象的函数。优点是如果函数体内有调用该函数的时候（递归），解除函数体代码与函数名的耦合状态，即使函数被重新命名也不会受到影响。这里会常常联想到函数的caller属性，在代码中可能会使用 arguments.callee.caller 来得到函数的调用函数。

### 基于上述arguments属性，可以总结出有哪些用途？
* 获取全部参数（上文已提及）
* 通过callee得到函数本身（上文已提及）
* 根据arguments可以得到所有的参数，通过判断参数对象的长度实现不同参数个数时不同的函数实现，以此模拟函数重载。