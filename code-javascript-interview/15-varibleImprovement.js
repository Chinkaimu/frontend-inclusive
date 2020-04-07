/* eslint-disable no-use-before-define */
function v () {
  console.log(a) // undefined
  a = 'aaa'
  var a = 'bbb'
  console.log(a) // bbb
}
v()
