/**
 * JSONP 的 promise 封装
 *   关键点：
 *        要把回调函数挂载到全局，这样返回的 <script>callback()</script> 才能调用到相应的函数
 *        要考虑超时的情况
 *        script.onerror
 * @param {*} data
 */
// eslint-disable-next-line no-unused-vars
function Jsonp (url) {
  return new Promise((resolve, reject) => {
    window.callback = function (data) {
      resolve(data)
    }

    const script = document.createElement('script')
    script.setAttribute(url + '?callback=' + window.callback)

    const head = document.getElementsByTagName('head')[0]
    head.appendChild(script)
  })
}
