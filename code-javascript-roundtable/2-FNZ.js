// question from FNZ
// eslint-disable-next-line no-unused-vars
function solution1 (A) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (!A || !A.length) return

  let longestPeriod = 1
  let currentPeriod = 1
  // indicates that is up(true) or down(false)
  let upFlag = null

  for (let i = 1; i < A.length; i++) {
    upFlag = getCurrentFlag(A[i], A[i - 1], upFlag)
    console.log(upFlag)
    if (upFlag !== null) {
      currentPeriod++
    } else {
      longestPeriod = Math.max(longestPeriod, currentPeriod)
      currentPeriod = 1
    }
  }
  longestPeriod = Math.max(longestPeriod, currentPeriod)
  return longestPeriod
}

function getCurrentFlag (a, b, upFlag) {
  // before the first, if a > b, up is true
  if (upFlag === null) {
    return a > b
  }

  // before down, current up
  if (a > b && !upFlag) {
    return true
  }

  // before up, current down
  if (a < b && upFlag) {
    return false
  }

  return null
}

function solution (A) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (!A || !A.length) return

  let longestPeriod = 1
  let currentPeriod = 1
  // indicates that is up(true) or down(false)
  let upFlag = null

  for (let i = 1; i < A.length; i++) {
    if (A[i] === A[i - 1]) {
      longestPeriod = Math.max(longestPeriod, currentPeriod)
      currentPeriod = 1
      upFlag = null
    } else if (A[i] > A[i - 1]) {
      if (upFlag === null || upFlag === false) {
        currentPeriod++
      } else {
        // upFlag === true
        longestPeriod = Math.max(longestPeriod, currentPeriod)
        currentPeriod = 2
      }
      upFlag = true
    } else if (A[i] < A[i - 1]) {
      // A[i] < A[i - 1]
      if (upFlag === null || upFlag === true) {
        currentPeriod++
      } else {
        longestPeriod = Math.max(longestPeriod, currentPeriod)
        currentPeriod = 2
      }
      upFlag = false
    }
  }
  longestPeriod = Math.max(longestPeriod, currentPeriod)

  return longestPeriod
}

console.log(solution([9, 4, 2, 10, 7, 8, 8, 1, 9]))

// function solution(A) {
//   let expectAsec = true;
//   let max = 0;
//   let count = 0;
//   let prev = Number.MIN_SAFE_INTEGER;
//   for (const num of A) {
//     if ((expectAsec && num > prev) || (!expectAsec && num < prev)) {
//       expectAsec = !expectAsec;
//       count++;
//     } else {
//       count = 2;
//     }
//     max = Math.max(count, max);
//     prev = num;
//   }
//   return max;
// }
