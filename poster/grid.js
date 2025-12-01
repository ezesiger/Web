let grid;
let pixelatedGrid;
let magnifiedArea;

function preload() {
  grid = loadImage("assets/grid.jpg");
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('display', 'block'); // Remove extra spacing

  pixelatedGrid = createImage(width, height);
  pixelatedGrid.copy(grid, 0, 0, grid.width, grid.height, 0, 0, width, height);
  
  // Create     separate graphics for the magnified area
  magnifiedArea = createGraphics(width, height);
  
  makeDithered(pixelatedGrid, 4);
}

function draw() {
  // Draw the base image
  image(pixelatedGrid, 0, 0);
  
  // Apply magnification on top
  let magnifySize = width * 0.125; // 12.5% of canvas width
  squareMagnify(magnifySize);
}

function squareMagnify(magnifySize) {
  let magnification = 2.5;
  let halfSize = magnifySize / 2;
  let magnifiedSize = magnifySize * magnification;
  
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Source coordinates (area to sample from)
    let sx = constrain(mouseX - halfSize, 0, width - magnifySize);
    let sy = constrain(mouseY - halfSize, 0, height - magnifySize);
    
    // Destination coordinates (where to draw magnified area)
    let dx = mouseX - halfSize * magnification;
    let dy = mouseY - halfSize * magnification;
    
    // Constrain the destination coordinates to keep the magnified box within canvas
    dx = constrain(dx, 0, width - magnifiedSize);
    dy = constrain(dy, 0, height - magnifiedSize);
    
    // Use copy() to magnify the area
    copy(
      pixelatedGrid,
      sx, sy, magnifySize, magnifySize,           // Source
      dx, dy, magnifiedSize, magnifiedSize        // Destination
    );
  }
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

function closestStep(max, steps, value) {
  let step = round(steps * value / 255) * floor(255 / steps);
  // Brighten the colors by shifting the range
  let blueValue = 255;
  let redGreenValue = step;
  
  // Apply brightness boost - adjust this value (1.0 = no change, 1.5 = 50% brighter)
  let brightness = 2;
  redGreenValue = min(255, redGreenValue * brightness);
  
  return {r: redGreenValue, g: redGreenValue, b: blueValue};
}

function makeDithered(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let oldR = red(clr);
      let oldG = green(clr);
      let oldB = blue(clr);
      
      // Convert to grayscale first for dithering
      let gray = (oldR + oldG + oldB) / 3;
      
      let newColor = closestStep(255, steps, gray);
      let newClr = color(newColor.r, newColor.g, newColor.b);
      setColorAtIndex(img, x, y, newClr);

      let errR = gray - (newColor.r + newColor.g + newColor.b) / 3;
      let errG = errR; // Use same error for all channels
      let errB = errR;

      distributeError(img, x, y, errR, errG, errB);
    }
  }

  img.updatePixels();
}

function distributeError(img, x, y, errR, errG, errB) {
  addError(img, 7 / 16.0, x + 1, y, errR, errG, errB);
  addError(img, 3 / 16.0, x - 1, y + 1, errR, errG, errB);
  addError(img, 5 / 16.0, x, y + 1, errR, errG, errB);
  addError(img, 1 / 16.0, x + 1, y + 1, errR, errG, errB);
}

function addError(img, factor, x, y, errR, errG, errB) {
  if (x < 0 || x >= img.width || y < 0 || y >= img.height) return;
  let clr = getColorAtindex(img, x, y);
  let r = red(clr);
  let g = green(clr);
  let b = blue(clr);
  clr.setRed(r + errR * factor);
  clr.setGreen(g + errG * factor);
  clr.setBlue(b + errB * factor);

  setColorAtIndex(img, x, y, clr);
}