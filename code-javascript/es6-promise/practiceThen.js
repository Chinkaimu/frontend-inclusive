const getJSON = (url) => {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const client = new XMLHttpRequest()
    client.open('Get', url)
    client.onreadystatechange = handler
    client.responseType = 'json'
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

getJSON('./posts.json').then(json => {
  // return 值作为 then 返回的 promise 对象 resolve 的参数
  // 如果没有返回，则下一个 then 的参数为 undefined
  return json.name
}).then(name => {
  console.log('my name is ', name)
})

getJSON('./posts.json').then(json => {
  return getJSON(`${json.name}.json`)
}).then(content => {
  console.log('my age is ', content.age)
})
