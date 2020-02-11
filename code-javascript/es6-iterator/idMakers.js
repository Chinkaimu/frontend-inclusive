const it = idMaker()

function idMaker () {
  let count = 0

  return {
    next: function () {
      return { value: count++, done: false }
    }
  }
}

console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
console.log(it.next())
