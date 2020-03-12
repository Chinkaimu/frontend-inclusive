class A {
  constructor (value) {
    this.value = value
  }

  toString () {
    return this.value++
  }
}
const a = new A(1)
if (a === 1 && a === 2 && a === 3) {
  console.log('Hi Eno!')
}
