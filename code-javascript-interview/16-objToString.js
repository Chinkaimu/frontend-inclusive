function json2str (o) {
  var arr = []
  var fmt = function (s) {
    if (typeof s === 'object' && s != null) return json2str(s)
    return "'" + s + "'"
  }
  for (var i in o) arr.push("'" + i + "':" + fmt(o[i]))
  return '{' + arr.join(',') + '}'
}

const obj = { a: true, b: 2, c: 'sss', d: { x: { m: 'name' } } }
const result = json2str(obj)
console.log(typeof result)
console.log(result)
