const remainStamp = new Date('February 21, 2020 18:00:00').getTime() - new Date().getTime()

const remainSeconds = Math.floor(remainStamp / 1000)
console.log('remainSeconds', remainSeconds)

const hours = Math.floor(remainStamp / 3600000)
const remainHour = remainStamp % 3600000
const minutes = Math.floor(remainHour / 60000)
const seconds = Math.floor((remainHour % 60000) / 1000)

console.log(`剩余 ${hours}小时 ${minutes}分 ${seconds}秒`)

const date = new Date()
const hour = date.getHours()
const minute = date.getMinutes()
const second = date.getSeconds()
console.log(`time is ${hour}:${minute}:${second}`)
