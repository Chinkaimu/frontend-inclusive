// this 对象是在运行时基于函数的执行环境绑定的。

var a = 1

if (a) {
  let b = 2
}

const obj = {
  a: 2,
  A () {
    console.log(this.a)
  },
  B: () => {
    console.log(this.a)
  }
}

console.log(a)
// // console.log(b) // 这里会报错，不会继续往下执行，并没有声明变量
obj.A() // 2，obj 调用，所以 this 会指向 obj
obj.B() // 1

const func = obj.A
func()
