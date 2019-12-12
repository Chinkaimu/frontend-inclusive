function mergeSortedArray (a1, a2) {
  const result = []
  const len = a1.length + a2.length

  for (let i = 0; i < len; i++) {
    if (a1.length === 0 && a2.length > 0) {
      return result.concat(a2)
    };

    if (a2.length === 0 && a1.length > 0) {
      return result.concat(a1)
    }

    if (a1[0] >= a2[0]) {
      result.push(a2.shift())
    } else {
      result.push(a1.shift())
    }
  }

  return result
}

console.log(mergeSortedArray([1, 2, 2, 3, 4, 5, 7], [2, 6, 7, 8, 10]))
