const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let originImageData;
let image_width;
let image_height;
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

let isAnimate = false;

function main() {
  var image = new Image();
  image.onload = function () {
    image_width = image.width;
    image_height = image.height;
    canvas.width = image.width;
    canvas.height = image.height;
    canvas.style.width = image_width;
    canvas.style.height = image_height;
    ctx.drawImage(image, 0, 0);
    originImageData = ctx.getImageData(0, 0, image_width, image_height);
  }
  image.src = './cyberpunk.jpg';
  canvas.addEventListener('mouseover', button1_click);
  canvas.addEventListener('mouseout', button2_click);
  requestAnimationFrame(animation);
}

function button1_click() {
  isAnimate = true;
  console.log('TR: functionbutton1_click -> isAnimate', isAnimate);
  // requestAnimationFrame(animation);
  // ctx.save();
  // for (let i = 0, len = 30; i < len; i++) {
  //   const x = Math.round(Math.random() * 100) - 50;
  //   offset(i + 30, x);
  // }
}

function button2_click() {
  isAnimate = false;
  ctx.putImageData(originImageData,0,0);
  // ctx.restore();
}

function animation() {
  if (isAnimate) {
    for (let i = 0, len = image_height / 5; i < len; i += 1) {
      const x = Math.round(Math.random() * 20) - 10;
      offset(i + image_height * 0.4, x);
    }
  }
  requestAnimationFrame(animation);
}

function getLineData(y) {
  return originImageData.data.slice(y * image_width * 4, (y + 1) * image_width * 4);
}

function offset(y, offset_x) {
  var newArray = new Uint8ClampedArray(image_width * 4);
  var lineData = getLineData(y);
  if (offset_x > 0) {
    // 向右偏移
    const x = Math.abs(offset_x);
    newArray.set(lineData.slice(0, (image_width - x) * 4), x * 4);
    // 空位补0
    newArray.fill(0, 0, x * 4);
    var newLineData = new ImageData(newArray, image_width, 1);
    ctx.putImageData(newLineData, 0, y);
  } else {
    // 向左偏移
    const x = Math.abs(offset_x);
    newArray.set(lineData.slice(x * 4));
    // 空位补0
    newArray.fill(0, (image_width - x) * 4);
    var newLineData = new ImageData(newArray, image_width, 1);
    ctx.putImageData(newLineData, 0, y);
  }
}

main();
