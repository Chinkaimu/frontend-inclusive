function quickSort (nums, start, end) {
  if (!nums || !nums.length) return null

  if (end <= start) {
    return nums
  }

  let i = start
  let j = end

  const pivot = nums[start + Math.floor((end - start) / 2)]
  while (i <= j) {
    while (nums[i] < pivot) {
      i++
    }
    while (nums[j] > pivot) {
      j--
    }

    if (i < j) {
      const temp = nums[i]
      nums[i] = nums[j]
      nums[j] = temp
      i++
      j--
    }
  }

  if (i === j) {
    i++
  }

  quickSort(nums, start, j)
  quickSort(nums, i, end)
}

const nums = [2, 5, 12, 4]
quickSort(nums, 0, 3)
console.log(nums)

2, 5, 12, 4  => 4