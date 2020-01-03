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
  let y = 0;
  for (let i = 0, len = 30; i < len; i += 5) {
    y++;
    offset(10 + y, i);
  }
  y = 0;
  for (let i = 0, len = 30; i < len; i += 2) {
    y++;
    offset(5 + y, i);
  }
}

function offset(y, offset_x) {
  var newArray = new Uint8ClampedArray(500 * 4);
  var imageData = ctx.getImageData(0, y, 500, 1);
  console.log('TR: log -> imageData', imageData);
  // 左5
  newArray.set(imageData.data.slice(offset_x * 4));
  newArray.fill(0, (500 - offset_x) * 4);
  console.log('TR: log -> newArray', newArray);
  var newImageData = new ImageData(newArray, 500, 1);
  console.log('TR: log -> newImageData', newImageData);
  ctx.putImageData(newImageData, 0, y);
}

main();