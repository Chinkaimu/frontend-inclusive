/**
 * 实现指定区间内的斐波那契数列。斐波那契是指从第三项开始，每一项都为其前两项的值之和：1 2 3 5 8 13 21 34 ...
 * 例如，给定 100, 2000，需要打印 100 101 201 302 503 805 1308
 */
// 思路：定义 2 个值一直记录当前需要计算的内容
function fibonacci1 (start, max) {
  console.log(start)

  let second = start + 1
  while (second <= max) {
    console.log(second)
    const result = second + start
    start = second
    second = result
  }
}

fibonacci1(100, 2000)

function fibonacci2 (start, max) {
  const result = [start]

  let second = start + 1

  while (second <= max) {
    result.push(second)
    const temp = start + second
    start = second
    second = temp
  }
  return result
}
console.log(fibonacci2(100, 2000))

// 尾递归
// 递归实现fibonacci (n太大会使浏览器假死)
function fib2 (n) {
  if (n <= 2) {
    return 1
  }
  return fib2(n - 2) + fib2(n - 1)
}

console.log(fib2(9)) // 34

// 尾递归实现fibonacci (尾调用优化)
function fib3 (n, n1 = 1, n2 = 1) {
  if (n <= 2) {
    return n2
  } else {
    return fib3(n - 1, n2, n1 + n2)
  }
}

console.log(fib3(9)) // 34
