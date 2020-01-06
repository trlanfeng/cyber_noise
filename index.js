const canvas = document.getElementById('canvas');
canvas.width = 500;
canvas.height = 100;
const ctx = canvas.getContext('2d');
let originImageData;
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');


function main() {
  var image = new Image();
  image.onload = function () {
    ctx.drawImage(image, 0, 0);
    originImageData = ctx.getImageData(0, 0, 500, 100);
  }
  image.src = './small.png';
  button1.addEventListener('click', button1_click);
  button2.addEventListener('click', button2_click);
}

function button1_click() {
  requestAnimationFrame(animation);
  // ctx.save();
  // for (let i = 0, len = 30; i < len; i++) {
  //   const x = Math.round(Math.random() * 100) - 50;
  //   offset(i + 30, x);
  // }
}

function button2_click() {
  // ctx.restore();
}

function animation() {
  ctx.restore();
  for (let i = 0, len = 30; i < len; i++) {
    const x = Math.round(Math.random() * 20) - 10;
    offset(i + 30, x);
  }
  requestAnimationFrame(animation);
}

function getLineData(y) {
  return originImageData.data.slice(y * 500 * 4, (y + 1) * 500 * 4);
}

function offset(y, offset_x) {
  var newArray = new Uint8ClampedArray(500 * 4);
  var lineData = getLineData(y);
  if (offset_x > 0) {
    // 向右偏移
    const x = Math.abs(offset_x);
    newArray.set(lineData.slice(0, (500 - x) * 4), x * 4);
    // 空位补0
    newArray.fill(0, 0, x * 4);
    var newLineData = new ImageData(newArray, 500, 1);
    ctx.putImageData(newLineData, 0, y);
  } else {
    // 向左偏移
    const x = Math.abs(offset_x);
    newArray.set(lineData.slice(x * 4));
    // 空位补0
    newArray.fill(0, (500 - x) * 4);
    var newLineData = new ImageData(newArray, 500, 1);
    ctx.putImageData(newLineData, 0, y);
  }
}

main();
