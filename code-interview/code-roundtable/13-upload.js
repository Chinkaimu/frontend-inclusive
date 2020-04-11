/**
 * upload files
 */
var input = document.createElement('input')
//  如果要多个文件，可以设置 multiple 属性
input.type = 'file'
// document.querySelector 返回文档中与指定选择器或选择器组匹配的第一个 html 元素
document.querySelector('body').append(input)
input.click()
setTimeout(() => {
  input.remove()
}, 1000)

input.onchange = function () {
  // input.files 获取文件列表
  var file = input.files[0]
  // eslint-disable-next-line no-undef
  var form = new FormData()
  form.append('file', file)
  // Object file includes name, lastModified, lastModifiedDate, size, type, webkitRelativePath
  form.append('file', file.name)
  // eslint-disable-next-line no-undef
  var xhr = new XMLHttpRequest()
  xhr.open('POST', 'http://localhost:8080/upload.do')
  // 设置请求头必须要 open 之后，send 之前
  xhr.setRequestHeader('content-type', 'multipart/form-data')
  xhr.send(form)
  // readyState 存有 XMLHttpRequest 的状态，0: 请求未初始化； 1: 服务器链接已建立； 2: 请求已接收； 3: 请求处理中； 4: 请求已完成，且响应就绪
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 处理返回的数据
    }
  }
}
