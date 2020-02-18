/**
 * load image asynchronously
 */
function loadImageAsync (url) {
  return new Promise(function (resolve, reject) {
    var image = new Image()

    image.onload = function () {
      resolve(image)
    }

    image.onerror = function () {
      reject(new Error('Could not load image at ' + url))
    }
    image.src = url
  })
}
loadImageAsync('./img.jpeg').then(function () {
  console.log('done')
  var imageElement = document.createElement('img')
  imageElement.src = './img.jpeg'
  document.getElementById('list').append(imageElement)
})
