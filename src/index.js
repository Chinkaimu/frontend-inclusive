import Index from './index.css'

function component () {
  const html = `<div class="${Index.container}">
    <h2 class=${Index.title}>CSS Modules</h2>
  </div>`

  const element = document.createElement('div')
  element.innerHTML = html
  return element
}

document.body.append(component())
