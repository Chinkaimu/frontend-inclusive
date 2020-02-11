class RangeIterator {
  constructor (start, stop) {
    this.value = start
    this.stop = stop
  }

  // If the property [Symbol.iterator] return iterator, states will be visited by loop "for...of" or spread operation "...".
  [Symbol.iterator] () {
    return this
  }

  next () {
    const value = this.value
    if (value < this.stop) {
      this.value++
      return { value: value, done: false }
    } else {
      return { value: undefined, done: true }
    }
  }
}

function range (start, stop) {
  return new RangeIterator(start, stop)
}

for (const value of range(0, 2)) {
  console.log(value)
}
