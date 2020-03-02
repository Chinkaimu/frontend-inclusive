/* eslint-disable camelcase */
function fn (e, addition = 'debounce') {
  setTimeout(() => console.log(addition + 'e =', e.target.value), 10)
}

const unDebounceInput = document.getElementById('unDebounce')

unDebounceInput.addEventListener('keyup', function (e) {
  fn(e, 'unDebounce')
})

const debounceInput = document.getElementById('debounce')
debounceInput.addEventListener('keyup', debounce(fn))

/**
 * We assume that an event will be called after n seconds, if the event is called during the time, timer will start again.
 * @param {*} func
 * @param {*} wait
 */
function debounce (func, wait = 500) {
  // Generate an variable to store the return timer.
  let timerId
  return function (...args) {
    clearTimeout(timerId) // Clear timer before
    /**
     * Create new time, and the time will be counted again
     * The last event will cover the prior events.
     */
    timerId = setTimeout(() => func.apply(this, args), wait)
  }
}

// eslint-disable-next-line camelcase
// eslint-disable-next-line no-unused-vars
function copyDebounce (func, wait = 500) {
  let timer = null

  return function (...args) {
    clearTimeout(timer)

    const self = this
    timer = setTimeout(() => {
      func.apply(self, args)
    }, wait)
  }
}
