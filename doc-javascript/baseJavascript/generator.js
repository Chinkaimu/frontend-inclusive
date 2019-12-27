/**
 * generator implements iterables
 * Example: We want to make a custom iterable that returns `This` , 'is' and `iterable`.
 */

const customImplement = {
  // Symbol.iterator is a function that create iterator object with property `next`
  [Symbol.iterator]: () => {
    let step = 0
    return {
      next () {
        step++
        if (step === 1) {
          step++
          return { value: 'This', done: false }
        } else if (step === 2) {
          step++
          return { value: 'is', done: false }
        } else if (step === 3) {
          step++
          return { value: 'iterator', done: false }
        }

        return { value: undefined, done: true }
      }
    }
  }
}
for (const term of customImplement) {
  console.log(term)
}

function * generatorImplement () {
  yield 'This'
  yield 'is'
  yield 'iterator'
}

for (const newTerm of generatorImplement()) {
  console.log(newTerm)
}

/**
 * generator introduction
 */
function * generatorFunction () {
  console.log('This will be executed first.')
  // The keyword yield is the breakpoint and return the value
  yield 'Hello'

  // return will set the `done` property `true` after which the generator can't generate any more values.
  // return 'b'

  console.log('I will be printed after the pause')
  yield 'World'
}

const generatorObject = generatorFunction()
// console.log(generatorObject.next())
// console.log(generatorObject.next())
// console.log(generatorObject.next())

// Because generator object is an iterator, so we can use it in `for-of` loops or other functions accepting an iterable.
const testIterator = () => {
  for (const item of generatorObject) {
    console.log('item', item)
  }
}
testIterator()
