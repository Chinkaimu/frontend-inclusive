const biu = function () {
  console.log('biu biu biu', new Date().toLocaleString())
}

const boom = function () {
  console.log('boom boom boom', new Date().toLocaleString())
}
function debounce (fun, delay) {
  return function (args) {
    const that = this
    const _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      return fun.call(that, _args)
    }, delay)
  }
}

// eslint-disable-next-line no-undef
// In about 500ms, it will be only one call.
setInterval(debounce(biu, 500), 1000)
// In 2000ms, there will be only one call, in the meantime, it will be called again, the timer starts again.
setInterval(debounce(boom, 2000), 1000)
