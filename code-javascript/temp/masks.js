function startWork () {
  const innerTimer = setInterval(() => {
    const button = document.getElementById('btn-reservation')

    if (button) {
      if (button.className.indexOf('disable') === -1) {
        button.click()
        clearInterval(innerTimer)
      } else {
        const remainStamp = new Date('February 21, 2020 18:18:00').getTime() - new Date().getTime()
        const remainSeconds = Math.floor(remainStamp / 1000)

        if (remainSeconds < 3) {
          window.location.reload()
        }
      }
    }
  }, 500)
}

startWork()
