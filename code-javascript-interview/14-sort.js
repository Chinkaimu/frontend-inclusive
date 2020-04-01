/**
 * semversion如何实现代码？
 * 1.2.1 > 1.2.0 > 1.1.2.rc.1 > 1.1.2.beta.1 > 1.1.2.alpha.1 > 1.0.0
 */

function sort (input) {
  const versions = []

  for (let i = 0; i < input.length; i++) {
    versions[i] = input[i].split('.')
  }

  versions.sort((a, b) => {
    const lenA = a.length
    const lenB = b.length

    for (let i = 0; i < lenA && i < lenB; i++) {
      if (a[i] < b[i]) {
        // a 如果小于 b 就会排在前面，返回 -1
        return -1
      } else if (a[i] > b[i]) {
        return 1
      }
    }
  })

  for (let i = 0; i < versions.length; i++) {
    input[i] = versions[i].join('.')
  }

  return input
}

const versions = ['1.2.1', '1.0.0', '1.1.2.rc.1', '1.1.2.alpha.1', '1.1.2.beta.1']

console.log(sort(versions))
