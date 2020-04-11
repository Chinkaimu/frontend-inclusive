/**
 * 防抖：在前一个事件还没完成时又触发一个事件，导致短时间内可能多次抖动
 * 解决方案：
 *  * 给事件函数包一个定时器返回，如果触发新的任务，把原来的定时器（即事件）取消。
 *  * （1）新的定时器启动，等待执行事件。（2）立即执行的话，加一个标记查看现在能否执行，然后等待 wait 时间将定时器设置为 null
 *  * 通过闭包保存定时器，用以判断现在是不是有事件在等待执行
 *
 * 节流：当持触发事件时，保证间隔触发一次事件
 */
// eslint-disable-next-line no-unused-vars
function debounce1 (func, wait = 500, ...args) {
  let timer = null
  return function () {
    // 上下文是真正执行的函数
    const context = this
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

// eslint-disable-next-line no-unused-vars
function debounce2 (func, wait = 300, ...args) {
  let timer

  return function () {
    // TODO: 记得先要存储上下文，这本来是 func 的上下文
    const context = this
    if (timer) clearTimeout(timer)
    // timer 已清空
    const callNow = !timer

    timer = setTimeout(() => {
      timer = null
    }, wait)

    callNow && func.apply(context, ...args)
  }
}

// 结合版本
// eslint-disable-next-line no-unused-vars
function debounce3 (func, wait = 500, immediate, ...args) {
  let timer

  return function () {
    const context = this

    if (timer) clearTimeout(timer)

    if (immediate) {
      const callNow = !timer
      timer = setTimeout(() => {
        timer = null
      }, wait)
      callNow && func.apply(context, args)
    } else {
      timer = setTimeout(() => {
        func.apply(context, args)
      }, wait)
    }
  }
}

// 节流
// 时间限制法，闭包存储之前事件的时间。只有时间超过了才能触发事件。
// eslint-disable-next-line no-unused-vars
function throttle1 (func, wait = 500, ...args) {
  // TODO: 需要初始化为 0 ， 不然第一次计算减法会变成 NaN
  let prevTime = 0

  return function () {
    const context = this
    // TODO: Date.now() returns the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC
    const currentTimer = Date.now()
    if (currentTimer - prevTime >= wait) {
      // It will be execute right now.
      func.apply(context, args)
      prevTime = currentTimer
    }
  }
}

// 定时器判断当前是否有事件等待执行，不存在定时器的时候执行；在每次事件执行时需要设置定时器回到 null。
// eslint-disable-next-line no-unused-vars
function throttle2 (func, wait = 500, ...args) {
  let timer

  return function () {
    const context = this

    if (!timer) {
      // It will be called after wait milliseconds.
      timer = setTimeout(() => {
        timer = null
        func.apply(context, args)
      }, wait)
    }
  }
}

// eslint-disable-next-line no-unused-vars
function throttle3 (func, wait, immediate, ...args) {
  let time
  if (immediate) {
    time = 0
  }

  return function () {
    const context = this

    if (immediate) {
      const current = Date.now()

      if (current - time >= wait) {
        func.apply(context, args)
        time = current
      }
    } else {
      if (!time) {
        time = setTimeout(() => {
          func.apply(context, args)
          time = null
        }, wait)
      }
    }
  }
}
