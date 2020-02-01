/**
 * Returns a function, that, when invoked, will only be triggered at most once during a given window of time.
 */
function fn (e, addition = 'debounce') {
  setTimeout(() => console.log(addition + 'e =', e.target.value), 100)
}

/**
 * use timer
 * It will be triggered after n seconds while invoked and execute one more time after stop the trigger.
 */
function throttle1 (method, wait = 300) {
  let timerId = null
  return function (...args) {
    if (!timerId) {
      timerId = setTimeout(() => {
        const result = method.apply(this, args)
        // Reset the timerId after the method has finished execution.
        timerId = null
        return result
      }, wait)
    }
  }
}
const input1 = document.getElementById('input1')
input1.addEventListener('keyup', throttle1(fn))

/**
 * use timestamp
 */

function throttle2 (method, wait = 600) {
  let prev = 0
  return function (...args) {
    const now = +new Date()
    if (now - prev > wait) {
      prev = now
      return method.apply(this, args)
    }
  }
}
const input2 = document.getElementById('input2')
input2.addEventListener('keyup', throttle2(fn))
