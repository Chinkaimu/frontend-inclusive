/**
 * 足球比赛的规则，我们应该都很了解，现在让我们来用代码模拟一场足球比赛：
 * 规则：两队名为“A”和“B”各有11名球员;每支球队的球员从1到11进行编号。队员收到红牌会被直接罚下场，收到两张黄牌也会被罚下场。如果其中一支球队剩下的球员少于 7 人，则裁判立即停止比赛，并且少于 7 名球员的球队输掉比赛。
 * 现在，让我们实现一个函数，输入一个数组，数组的内容是裁判员判罚的内容，数组的每一项包括：队伍名称（A或B），队员编号(1 到 11)，以及受到惩罚（R：红牌，Y：黄牌）。输出两个队伍最后剩余的人数：
 * 输入：["A4Y", "A5R", "B5R", "A4Y", "B6Y"]，输出：[9,10]
 * 输入：[]，输出：[11, 11]
 * 输入：["A4R", "A4R", "A4R"]，输出：[10,11]
 */

// 思路： 通过 11 长度数组存储状态，注意不要随便变换位置，空间复杂度 O(n) 时间复杂度 O(n)
function solution (punishes) {
  const A = new Array(11)
  A.fill(0)
  const B = new Array(11)
  B.fill(0)

  for (const punish of punishes) {
    if (punish[0] === 'A') {
      punish[2] === 'Y' && A[punish[1] - 1]++
      punish[2] === 'R' && (A[punish[1] - 1] = 2)
    } else if (punish[1] === 'B') {
      punish[2] === 'Y' && B[punish[1] - 1]++
      punish[2] === 'R' && (B[punish[1] - 1] = 2)
    }
  }

  return [left(A), left(B)]
}

// 也可以为每个数组增加一个 count 变量记录数据，就不需要额外的遍历
function left (arr) {
  let count = 0

  arr.forEach(item => {
    item < 2 && count++
  })

  return count
}

console.log(solution(['A4Y', 'A5R', 'B5R', 'A4Y', 'B6Y']))
console.log(solution(['A4R', 'A4R', 'A4R']))
