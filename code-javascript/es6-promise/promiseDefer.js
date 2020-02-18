/* eslint-disable standard/no-callback-literal */
var oneOneSecondLater = function (cb) {
  setTimeout(function () {
    cb(1)
  }, 1000)
}

var twoOneSecondLater = function (callback) {
  var a, b
  var consider = function () {
    if (a === undefined || b === undefined) return
    callback(a + b)
  }

  // 1000ms 后将 1 赋值给 a ,调用consider
  oneOneSecondLater(function (_a) {
    a = _a
    consider()
  })

  // 1000ms 后将 1 赋值给 b ,调用consider
  oneOneSecondLater(function (_b) {
    b = _b
    consider()
  })
}

twoOneSecondLater(function (c) {
  console.log(c)
})

var ref = function (value) {
  if (value && typeof value.then === 'function') { return value }
  return {
    then: function (callback) {
      return ref(callback(value))
    }
  }
}

// eslint-disable-next-line no-unused-vars
var defer = function () {
  var pending = []
  // eslint-disable-next-line no-unused-vars
  var value
  return {
    resolve: function (_value) {
      if (pending) {
        value = ref(_value)
        for (var i = 0, ii = pending.length; i < ii; i++) {
          var callback = pending[i]
          value.then(callback)
        }
        pending = undefined
      }
    },
    promise: {
      then: function (_callback) {
        var result = defer()
        var callback = function (value) {
          result.resolve(_callback(value))
        }
        if (pending.push(callback)) {
          pending.push(callback)
        } else {
          value.then(callback)
        }
        return result.promise
      }
    }
  }
}
