function fn (content) {
  console.log('content =', content)
}

const unDebounceInput = document.getElementById('unDebounce')

unDebounceInput.addEventListener('keyup', function (e) {
  setTimeout(() => fn(e.target.value), 500)
})

function debounce (func, wait, immediate) {
  let timeout
  return function (...args) {
    const context = this
    const later = function () {
      timeout = null
      if (!immediate) func.apply(context, args)
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(context, args)
  }
}

/**
 * 在前一个定时器执行完以前不插入定时器代码
 * 在前一个定时器执行完以后，间隔 50ms 插入定时器代码
 */
setTimeout(function () {
  const div = document.getElementById('myDiv')
  const left = parseInt(div.style.left) + 5
  div.style.left = left + 'px'

  if (left < 450) {
    // eslint-disable-next-line no-caller
    setTimeout(arguments.callee, 50)
  }
}, 50)
