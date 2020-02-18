/**
 * Run this app and copy codes in this file to the console to test
 * @param {} url
 */
const getJSON = function (url) {
  return new Promise((resolve, reject) => {
    // eslint-disable-next-line no-undef
    const client = new XMLHttpRequest()
    client.open('GET', url)
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
        reject(new Error(this.statusText))
      }
    }
  })
}

getJSON('./posts.json').then(json => {
  console.log('Contents is ', json)
}, error => {
  console.log('Error occurs ', error)
})
