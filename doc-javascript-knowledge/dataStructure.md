# 数据结构

## 数据类型的隐式类型转换
  * 转换场景：
    * if 语句和逻辑语句
    * 数学运算符
    * Native 调用（如 console.log, alert）
  * if 语句： 转成 boolean 值，null, undefined, '', NaN, 0, false 是 false
  * 逻辑语句：
    * == 
      * NaN 和任何类型比较都是 false
      * boolean 类型转换成 Number 类型比较
      * 比较特殊的比较：
      ```
        [] = ![] // true ![]首先会被转换为 false，再转 0。[] 转 0
      ```

  * 算数运算： 转成 number 再计算
  * 特殊的算数运算 —— 加法（主要是 number \ string 的计算。需要考虑 boolean, undefined, null, symbol, bigint, object 的转化，转化方向就是 string, number ，由另外一个操作数决定。
    * 转成 string（调用 toString 方法）：number, undefined, null, object。 需要注意的是原生 object 调用 toString 方法转成 '[object Object]'。 Array 的 toString 方法重写的原因会有相应的字符串类型。总之根据最后转换的结果再去计算。
      ```
        const obj = {a: 1}
        obj + '1' // '[object Object]1'
        obj + 1 // '[object Object]1'
        {a: 1} + 1 // 1 注意：特殊的内容，{} 在 + 前面，系统判断 {} 为代码块，不参与运算；
        1 + {a: 1} // '1[object Object]' , {} 在 + 后面被当作对象处理

        undefined + '1' // 'undefined1'
        null + '1' // 'null1'
      ```

    * 转成 number (注意不是调用的 valueOf, valueOf 是对象返回原始值): true -> 1; false -> 0
  参考文档： [JS 的类型转换](https://johninch.github.io/Roundtable/Question-Bank/basic-grammar/variablesAndTypes4.html)

## 对象的原型链

