import printMe from './print.js'
import './index.css'
// import MyImage from './images/left.jpeg'

function component () {
  const element = document.createElement('div')
  element.innerHTML = 'Hello World!'
  element.onclick = printMe

  // eslint-disable-next-line no-undef
  // const myIcon = new Image()
  // myIcon.src = MyImage
  // myIcon.style.width = '40px'

  // element.appendChild(myIcon)

  return element
}

let element = component()
document.body.append(element)

if (module.hot) {
  module.hot.accept('./print.js', function () {
    document.body.removeChild(element)
    element = component()
    document.body.appendChild(element)
  })
}
