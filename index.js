const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 100;
const ctx = canvas.getContext('2d');
const log_button = document.getElementById('log');

function main() {
  var image = new Image();
  image.onload = function () {
    console.log('TR: image.onload -> image', image.width);
    ctx.drawImage(image, 0, 0);
  }
  image.src = './color.png';
  log_button.addEventListener('click', log);
}

function log() {
  var newArray = new Uint8ClampedArray(500 * 4);
  var imageData = ctx.getImageData(0, 20, 500, 1);
  console.log('TR: log -> imageData', imageData);
  // 左5
  newArray.set(imageData.data.slice(100 * 4));
  newArray.fill(0, (500 - 100) * 4);
  console.log('TR: log -> newArray', newArray);
  // var newImageData = new ImageData(newArray, 500, 1);
  imageData.data = newArray;
  ctx.putImageData(imageData, 0, 20);
}

main();