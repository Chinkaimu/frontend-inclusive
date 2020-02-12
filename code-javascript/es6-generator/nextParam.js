// Pass param to a executing generator through next.
// The first call of next can't take a param, because the param represents the last result of yield.
function * f () {
  let i = 0
  while (true) {
    const reset = yield i
    if (reset) {
      i = -1
    }
    i++
  }
}

const fIterator = f()
console.log(fIterator.next(true))
console.log(fIterator.next())
console.log(fIterator.next())
console.log(fIterator.next(true))
console.log(fIterator.next())
console.log(fIterator.next())

// In order to pass a param to generator for the first call of next, we need a wrapper to call the next before.
function wrapper (generatorFunction) {
  return function (...args) {
    const generatorObj = generatorFunction(...args)
    generatorObj.next()
    return generatorObj
  }
}
const wrapped = wrapper(function * () {
  console.log(`First input: ${yield}`)
  return 'DONE'
})
const generatorWithWrapper = wrapped()
console.log(generatorWithWrapper.next('Hello world'))
console.log(generatorWithWrapper.next())
