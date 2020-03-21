function createFunctions () {
  var result = []

  for (var i = 0; i < 10; i++) {
    result[i] = function () {
      return i
    }
  }

  return result
}

// 返回的是 10
console.log(createFunctions()[5]())
