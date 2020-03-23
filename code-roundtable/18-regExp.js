/**
* 正则表达式常用转换
*  1. 大驼峰字符串转换
*  2. 股票代码所属市场
*  3. 验证字符串是否中国公民身份证
*  4. 验证手机号是否合法
*  5. 匹配邮箱
*  使用方法：
      String.prototype.replace(regExp, callback) || String.prototype.replace(regExp, string)
*/

// 连接符转成驼峰写法
function toCamel (str) {
  const reg = /-(\w)/g
  str = '-'.concat(str)

  return str.replace(reg, (match, letter) => {
    return letter.toUpperCase()
  })
}
console.log('toCamel', toCamel('this-is-a-string'))

// 驼峰写法改成链接符号
function toLink (str) {
  const reg = /([A-Z])/g
  
  return str.replace(reg, (match, letter) => {
    return ' '.concat(letter.toLowerCase())
  })
}
console.log('toLink', toLink('ThisIsAString'))

// 假设已知美股(US)股票代码为2到8位字母，港股(HK)为5位数字，沪深(A)为6位数字。根据输入判断是哪类股票。
function witchMarket (symbol) {
  // 通过 ^ 起始，$ 结尾 来达到整个字符串全部匹配
  const regUs = /^[a-zA-Z]{2,8}$/
  const regHk = /^\d{5}$/
  const regA = /^[0-9]{6}$/

  if (regUs.test(symbol)) {
    return symbol + '： 美股'
  } else if (regHk.test(symbol)) {
    return symbol + '： 港股'
  } else if (regA.test(symbol)) {
    return symbol + '： 未知'
  }
}

console.log(witchMarket('AAPL'))
console.log(witchMarket('00600'))
console.log(witchMarket('123456'))

// 验证身份证
/**
 * 已知中国居民身份证为18位，
 * 其中第7-14位出生年月日期，
 * 其中年份为四位数字表示；
 * 最后一位校验数字可以是罗马数字X。 
 * 要求根据以上条件，编写正则验证是否是符合19xx-20xx间出生的人的有效身份证，不符合该区间的出生日期判定为非法身份证。
 */
function checkIdCard (str) {
  const idReg = /^\d{6}(19|20)\d{9}(X|\d)$/
    if (idReg.test(str)) {
        return (str + " 是合法身份证");
    } else {
        return (str + " 非法身份证");
    }
}

console.log(checkIdCard("00000020990000000X")); // 合法
console.log(checkIdCard("11011119890222064A")); // 非法

// 验证手机号
function checkPhone (str) {
  const phoneReg = /^1[345678]\d{9}$/
  if (phoneReg.test(str)) {
    return '手机号'.concat(str)
  }
}
console.log(checkPhone('156690966371'))

// 验证邮箱，xxx999x@yyy.com
/**
* - 第一部分：由字母、数字、下划线、英语句号（.）组成， - 第二部分：为一个域名，域名由字母、数字、短横线（-）、英语句号（.）、域名后缀组成，而顶级域名后缀一般为2-6位字母，如cn,com,net。
*/
function checkMail (str) {
  const mailReg = /^[A-Z0-9_\.]+@[A-Z0-9-]+\.[A-Z]{2,6}$/i
  if (mailReg.test(str)) {
    return '邮箱'.concat(str)
  }
}
console.log(checkMail('haimeng.chm@gmail.com'))