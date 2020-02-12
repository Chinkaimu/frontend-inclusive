function * naturalNumbers () {
  let num = 1
  while (true) {
    yield num
    num++
  }
}

const numbers = naturalNumbers()
console.log(numbers.next().value)
console.log(numbers.next().value)
