const processor = {
  timeoutId: null,

  performProcessing: function () {
    console.log('performProcessing')
  },

  process: function () {
    clearTimeout(this.timeoutId)

    const that = this
    this.timeoutId = setTimeout(() => {
      that.performProcessing()
    }, 500)
  }
}
// performProcessing will perform once
// The execution of processor.process is more than 500ms, the next call processor will called in the meantime and therefore cover last timer.
processor.process()
processor.process()
processor.process()
processor.process()

// When the process called after the process has finish execution, it will call again.
setInterval(() => {
  processor.process()
}, 1000)
