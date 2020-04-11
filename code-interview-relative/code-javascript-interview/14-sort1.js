function sort (arr) {
  const versions = []
  for (let i = 0; i < arr.length; i++) {
    versions[i] = arr[i].split('.')
    // [[1,2,1], [1, 0, 0], [1, 1, 2, beta, 1]]
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = arr.length - 1; j > i; j--) {
      // 降序
      if (func(versions[j], versions[j - 1])) {
        [versions[j], versions[j - 1]] = [versions[j - 1], versions[j]]
      }
    }
  }

  for (let i = 0; i < versions.length; i++) {
    arr[i] = versions[i].join('.')
  }

  return arr
}

// array1 > array2 返回 true
function func (array1, array2) {
  const len1 = array1.length
  const len2 = array2.length
  for (let i = 0; i < len1 && i < len2; i++) {
    if (typeof array1[1] === 'string') {
      // a > b > r
      if (array1[i][0] < array2[i][0]) {
        return true
      }
    } else {
      if (array1[i] > array2[i]) {
        return true
      }
    }
  }
}

console.log(sort(['1.2.1', '1.0.0', '1.1.2.rc.1', '1.1.2.alpha.1', '1.1.2.beta.1', '1.2.0']))
