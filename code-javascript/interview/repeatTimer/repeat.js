
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