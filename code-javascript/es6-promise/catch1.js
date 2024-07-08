const getJSONRejected = url => {
  return new Promise((resolve, reject) => {
    reject(new Error('error'))
  })
}

// getJSON 状态为 rejected 时会执行 catch 内容
getJSONRejected('./posts.json').then((data) => {
  console.log('my name is ', data.name)
}).catch(error => {
  console.log('error ', error)
})

const getJSON = url => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const client = new XMLHttpRequest()
    client.open('Get', url)
    client.responseType = 'json'
    client.onreadystatechange = handler
    client.setRequestHeader('Accept', 'application/json')
    client.send()

    function handler () {
      if (this.readyState !== 4) {
        return
      }

      if (this.status === 200) {
        resolve(this.response)
      } else {
        reject(this.statusText)
      }
    }
  })
}

// 在 then 回调函数中抛出错误，也会执行 catch
getJSON('./posts.json').then((data) => {
  throw new Error('error occurs in then callback')
}).catch(error => {
  console.log('error ', error)
})

// 在 promise 状态为 resolve 后抛出错误不会被捕获
const promise = new Promise((resolve, reject) => {
  resolve('ok')
  throw new Error('promise error')
})
promise.then(data => {
  console.log('data is ', data)
}).catch(error => {
  console.log('error is ', error)
})

// Promise 对象抛出的错误不会传递到外层代码，即不会有任何反应
const someAsyncThing = () => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    resolve(x + 1)
  })
}
// throw error
someAsyncThing().then(() => console.log('Every thing is great'))
someAsyncThing()
  .catch(error => console.log('error is ', error))
  .then(() => {
    console.log('after catch')
  })

// catch 可能抛出新的错误需要后面的 catch 才能捕获
