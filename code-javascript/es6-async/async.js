const fs = require('fs')

// 先将回调函数包装成 Promise
function readFile (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

// 使用 async ： 内置自动执行器；await 后面可以跟 Promise 对象和原始类型（同步）
async function func () {
  try {
    const data1 = await readFile('file1.js')
    console.log(data1)
  } catch (e) {
    console.log('There is error', e)
  }
}

// async 函数返回的是 Promise 对象
func().then(() => {
  console.log('done after async function')
})

// async 函数返回的是 Promise 对象，则可以再次被 await 调用
async function func2 () {
  // 代码执行时遇到 await 会立即返回 Promise 对象，Promise 对象可以直接跟 catch 捕获 rejected 状态的错误
  await func().catch(err => {
    console.log('error occurs:', err)
  })
  console.log('func2 finish')
}
func2()
