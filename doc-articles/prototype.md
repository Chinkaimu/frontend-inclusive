## 上公式
A继承B，B继承C，C会自动继承Object。aInstance是A的实例，那么存在如下公式（[[prototype]]在浏览器中的实现是__proto__,是实例的原型）：

`A.prototype = aInstance.[[prototype]]`,

`B.prototype = aInstance.[[prototype]].[[prototype]]`,

`C.prototype = aInstance.[[prototype]].[[prototype]].[[prototype]]`,

`Object.prototype = aInstance.[[prototype]].[[prototype]].[[prototype]].[[prototype]]`，

只要实例能够通过一次[[prototype]]或多次[[prototype]方法访问得到的某类型的原型，该类型原型的方法本实例都能够访问得到。原型的原型的原型的原型，就是原型链啊！

开始分析····

## 前置知识
（熟悉对象和原型的直接跳过）
#### 类和对象的关系——简单例子
简单例子，“人”是一个类，有姓名的属性，思考的功能。通过具像化人的特征，例如“姓名：小明；”，得到了对象“小明”，拥有思考能力。

#### 对象和原型——对比java理解一下
在有类概念的面向对象语言中可以以 JAVA 为例，类是一个模板，描述一类对象的行为（方法）和状态(属性)。对象是类的实例，可以通过 new className()  创建一个对象。在通过类创建模板时，回调用类中与类名同名的构造函数，初始化对象属性——成员变量（不共享，每个对象独有）。创建了对象以后，对象可以访问成员方法（对象共享，应该是在语言层面在构造函数中处理了指向成员方法的指针）。
在JS中没有类的概念，但是有对象。**ECMA-262把对象定义为“无序属性的集合，其属性可以包含基本值、对象或者函数。”** 对象的内容其实跟Java基本相同的，不同指出在于JS不是通过类去生成的。JS通过怎么生成对象呢？基于引用类型，通过 new 关键字新建对象，例如new Object()，或者更为常见的是 new 构造函数创建，当然构造函数继承了Object，所以讲起来是差不多的东西的东西。
与java的比较一下，我们发现少了一层类的包装，我们直接是调用构造函数去了。构造函数什么功能开发者可以做什么功能呢，初始化属性。少了一点什么呢？那就是类去做的使得对象共享成员方法。
**“原型prototype”就解决了类之间共享属性的问题，每一个函数都有一个prototype属性，这个属性指向一个包含由特定类型创建的所有实例即对象共享的属性和方法。** 该特定实例的每一个实例都会包含一个指针[[prototype]]（即__proto__）指向构造函数的原型prototype（共享的实现）。访问一个对象的属性不存在对象中时就会从原型对象中查找。

## 原型链公式推导
继承乃面向对象的一大特性，在JS中主要是依靠原型链来实现。《高级程序设计》主要是通过图形来解释了类型、实例、原型之间的关系，发现有点难理解，并且会忽略掉一些关键点（可参考下文“总结注意点”），所以根据其文字描述推导出原型链的公式便于理解，仅供参考。
原型链的创建手段：让子类型A的原型对象等于父类型B的实例，父类型B的原型通过另一个类型C的实例赋值，层层递进。推导公式如下（不可执行，new A() 等只是实例的表示;[[prototype]]即__proto__）：
```
// 子类的原型通过父类实例去赋值，也就是父类的原型等于 所以
B.prototype === new C();
A.prototype === new B();

// 构造函数的原型 = 实例的原型 ，所以
A.prototype === new A().[[prototype]] 
B.prototype === new B().[[prototype]]
C.prototype === new C().[[prototype]]

// 上述的已知等式推导出，A实例的3层[[prototype]]等于C.prototype
C.prototype = (B.prototype).[[prototype]] = (new B().[[prototype]]).[[prototype]] = ((A.prototype).[[prototype]]).[[prototype]] = ((new A().[[prototype]]).[[prototype]]).[[prototype]]
```
从上面公式中我们可以看到，A的实例对象可以访问到A的原型，B的原型，以及C的原型，并且真正在原型链中起到关系连接作用的是实例的原型，而并非类型的原型，虽然他们的值相等，但意义不同。
（TODO：原型链继承实现、存在的弊端及解决方案待探讨。）

## 实操——看看公式以外的东西
#### 查看实际代码中原型链的形态
首先我们验证下公式是否正确，然后再仔细研究一下公式未包含的原型链相关内容。
* （0）验证公式的正确性，如下图实践，我们看到最终结果是true，加上末端继承的Object也是正确的。
![IMAGE](quiver-image-url/5B666E057BB8F7FC9FA84F6F053D9982.jpg =700x193)
* （1）实例的__proto__等于构造函数的prototype
![IMAGE](quiver-image-url/572669A54AE95B230AAC064C2A869AC4.jpg =392x65)
* （2）引用类型 Function 的原型是native code；每个函数都是Function类型的实例，所以结合（1）规则每个function的__proto__属性是native code，function。
![IMAGE](quiver-image-url/7E2FC97932E2A53589EEB00B79D23794.jpg =584x135)
* （3）每个函数都有一个原型属性，是一个Object类型，在没有继承其他类型的情况下，根据原型链继承的方式函数的原型prototype是Object实例，拥有__proto__属性指向Object的原型，函数拥有了Object的属性和方法，如valueOf等。
![IMAGE](quiver-image-url/84FAF251407E528059B9629F99EB728B.jpg =874x477)
* （4）有意思的来了，默认情况下所有prototype对象都会自动获得一个constructor属性指向prototype所在函数，就形成了prototype有constructor属性，constructor作为函数有prototype属性，循环开始。从（2）看构造函数会有__proto__属性等于Function的原型，所以构造函数拥有Function的所有方法。Fuction继承Object所有有__proto__属性指向Object的原型，然后就进入了Object原型和constructor的循环。目前还不知道这个有啥有，但是这个循环个人觉得很神奇～～
基于上述的推导补充了《高级程序设计》P164页的链路图，主要是标注循环、增加函数实例过程。
![WechatIMG87.jpeg](quiver-image-url/F665C1EEF2483A3BCEABF13E7006D769.jpg =1440x1080)

#### 面试题案例
分析了这么多的原型链，从文章[搞懂__proto__与prototype](https://juejin.im/post/5d9ea5c2f265da5b582393d2)找了个面试题分析感受下理解如下图：
![IMAGE](quiver-image-url/0CDCA517BC90D4839E3C493433130BE3.jpg =648x354)
通过公式上解题思路：
```
* f是F的实例，所以 f.__proto__ = F.prototype；原型对象会继承Object，所以f.__proto__.__proto__ = F.prototype.__proto__ = Object.prototype。从上面2个公式我们可以看到，f 可以访问到 F 和  Object 中构造函数（例题中未定义方法）和原型里面定义的方法（Object原型定义了方法a），因此 f.a()输出a，f.b()会报错，不存在该方法。
* 再看F，F 是Fuction的实例，所以 F.__proto__ = Function.prototype；原型对象继承Object。所以F拥有 Function 和 Object 两者的构造函数和原型中的方法，也就是a、b均能正常执行。
```

## 总结注意点——初学时忽略了出现了错误理解
* 构造函数的原型是prototype，实例的原型是[[prototype]]（ECMA-262第5版这么叫，浏览器中的实现大多是__proto__，但并不是所有的浏览器都支持该属性如IE6/7/8/9）。（TODO：ES6中的__proto__和prototype的理解又有点差异，这个待下次探讨）。
* 所有函数的默认原型都是Object的实例，因此默认原型都会包含一个内部指针指向Object.prototype，所以当我们SubType继承SuperType时，别忘了末端还有一个Object。SubType继承了SuperType，它的原型如果没有经过处理是没有constructor属性的；但是SubType默认继承Object的时候是有constructor属性的。
![IMAGE](quiver-image-url/3519F9A9C2BFD7BA79EDEC98D44A6323.jpg =775x725)



## 附录
* 公式验证代码
```
  function A() {this.a=1};
  function B() {this.b=1};
  function C() {this.c=1};
  B.prototype = new C();
  A.prototype = new B();
  var a = new A();
  a.__proto__.__proto__.__proto__ === C.prototype
```