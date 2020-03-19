/**
 * 获取 query 查询参数，返回对象
 * URL 的组成成分： 协议+端口+三级域名+路径+查询参数+锚点
 * http://www.taobao.com?x=1&y=2#12 返回 {x: 1, y: 2}
 */
function getQuery (url) {
  const result = {}
  url = url || window.location.url

  // 字符串的 match 方法检索返回一个字符串正则匹配的结果。如果使用g标志，则将返回与完整正则表达式匹配的所有结果，但不会返回捕获组。
  // 字符合集内，? 不需要转义
  // 反向检查以 ? 或者 & 开头
  // [^a-z] 表示匹配任何不在指定范围内的任意字符。所以这里表示非 '=&#'的任意字符，参数名必须至少有一个字符或多个字符(+)，参数值可以有零个或多个字符(*)
  // 完全匹配结果 [ 'x=1', 'y=2' ]
  const reg = /(?<=[?&])([^=&#]+)=([^&#]*)/g
  const querys = url.match(reg) // 返回匹配结果，不包括捕获组。如果要单词匹配，可以使用 RegExp.exec(url)，会返回一个包含匹配组的数组，第一个是完全匹配，然后是匹配组以及 index 等其他属性

  for (const item of querys) {
    const query = item.split('=')
    result[query[0]] = query[1]
  }

  return result
}

console.log(getQuery('http:www.baidu.com/index?name=username&age=27&pwd=zbc|123@&likes=lol&likes=beautifull girl&$id=main#flag=66'))

function getQueryByName (url, name) {
  url = url || window.location.url
  // 因为 name 是参数，所以需要先计算出正则表达式字符串，然后调用构造函数进行创建
  const reg = new RegExp('(?<=[?&])' + name + '=([^&#]*)')
  // 拿第一个捕获组
  return reg.exec(url)[1]
}

console.log(getQueryByName('http://www.taobao.com?x=1&y=2#12', 'x'))
