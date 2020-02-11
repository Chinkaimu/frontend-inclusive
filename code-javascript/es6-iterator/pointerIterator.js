function Obj (value) {
  this.value = value
  this.next = null
}

Obj.prototype[Symbol.iterator] = function () {
  let current = this

  return {
    next: function () {
      if (current) {
        const value = current.value
        current = current.next
        return { value, done: false }
      } else {
        return { done: true }
      }
    }
  }
}

const one = new Obj(1)
const two = new Obj(2)
const three = new Obj(3)

one.next = two
two.next = three

// It will not be visited when done is true
for (const value of one) {
  console.log(value)
}

const iterator = one[Symbol.iterator]()
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
