let points = [];
let textPoints = [];
let horses = [];
let crawl = [];
let currentCrawl = 0;
let currentHorse = 0;
let cycleSpeed = 0; // 0 = static, higher = faster
let lastHorseChange = 0;
let currentHorseImage = null; 
let autoCycle = false;
let caption;
let title;


function preload() {
  ballet = loadFont("assets/Ballet.ttf");
  horses[0] = loadImage('assets/H1.png');
  horses[1] = loadImage('assets/H2.png');
  horses[2] = loadImage('assets/H3.png');
  horses[3] = loadImage('assets/H4.png');
  horses[4] = loadImage('assets/H5.png');
  horses[5] = loadImage('assets/H6.png');
  horses[6] = loadImage('assets/H7.png');
  horses[7] = loadImage('assets/H8.png');
  horses[8] = loadImage('assets/H9.png');
  horses[9] = loadImage('assets/H10.png');
  horses[10] = loadImage('assets/H11.png');
  horses[11] = loadImage('assets/H12.png');
  crawl[0] = loadImage('assets/Crawl1.png');
  crawl[1] = loadImage('assets/Crawl2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  horseToPoints();
}

function draw() {
  background(0, 0, 255);

  // Auto-cycle horses if speed is > 0
  if (autoCycle && cycleSpeed > 0 && millis() - lastHorseChange > cycleSpeed) {
    currentHorse = (currentHorse + 1) % horses.length;
    horseToPoints();
    lastHorseChange = millis();
  }

  drawTitle();
  drawPoints();
  drawCaption();
  drawCrawl();

}

function drawTitle() {
  //declare titles
  let title1 = "Why do horses feel like the internet?";
  let title2 = "Technology is constantly evolving";
  let title3 = "Technology must be optimized";

  if (cycleSpeed <= 30 && cycleSpeed > 0) {
    title = title3;
  } else if (cycleSpeed <= 1000 && cycleSpeed > 0) {
    title = title2;
  } else {
    title = title1;
  }

  //text settings
    textFont(ballet);
    textSize(45);
    fill(255);
 
    //text to points
    let textPoints = ballet.textToPoints(
        title, 10, windowHeight/3, 70,
        { sampleFactor: 0.5 }
    );

    // Draw a dot at each point.
    for (let p of textPoints) {
        fill(255);
        stroke(255);
        strokeWeight(1.5);
        point(p.x, p.y);
    }
}

function drawCaption() {
  let caption0 = "click horse 2 optimize";
  let caption1 = "faster";
  let caption2 = "optimize your life";
  let caption3 = "someone else is outrunning you"
  let caption4 = "you can never be fast enough";

  if (cycleSpeed <= 50 && cycleSpeed > 0) {
    caption = caption4;
  } else if (cycleSpeed <= 100 && cycleSpeed > 0) {
    caption = caption3;
  } else if (cycleSpeed <= 400 && cycleSpeed > 0) {
    caption = caption2;
  } else if (cycleSpeed <= 2000 && cycleSpeed > 0) {
    caption = caption1;
  } else {
    caption = caption0;
  }


  noStroke();
  textFont('Arial');
  textSize(18);
  text(caption, windowWidth/1.5, windowHeight-(windowHeight/12));
  text(cycleSpeed, 20, 20);
}

function drawCrawl() {
  if (cycleSpeed <= 200 && cycleSpeed > 0) {
    image(crawl[currentCrawl], 10, 10, 350, 170);
  }

}

function horseToPoints(){
  points = []; // Clear previous points 
  let img = horses[currentHorse]; 
  img.resize(0, windowHeight / 1.1); 
  currentHorseImage = img; 

  // center image
  let offsetX = (width - img.width);
  let offsetY = (height - img.height);

  //turn horse image into points
    for (let i = 0; i < 1000; i++) {
      let x = random(width);
      let y = random(height); 
      let col = img.get(x, y);
      if (col[0] === 255 && col[1] === 0 && col[2] === 0){
        points.push(createVector(x + offsetX, y + offsetY));
      } else {
        i--;
      }
  }
}

function drawPoints(){
  // Draw a dot at each point.
  for (let v of points) {
      fill(255);
      stroke(255);
      strokeWeight(7);
      point(v.x, v.y);
  }
}

function mousePressed(){
  if (mouseX >= 10 && mouseX <= 360 && mouseY >= 10 && mouseY <= 180) {
    // Cycle to next image
    currentCrawl = (currentCrawl + 1) % crawl.length;
  } 

  if (isMouseOverHorse()) {
    increaseSpeed();
  }
}

function isMouseOverHorse() {
  if (!currentHorseImage) return false;
  
  // Calculate where the horse image is positioned on screen
  let offsetX = (width - currentHorseImage.width);
  let offsetY = (height - currentHorseImage.height);
  
  // Convert mouse position to image coordinates
  let imgX = mouseX - offsetX;
  let imgY = mouseY - offsetY;
  
  // Check if mouse is within the image bounds
  if (imgX >= 0 && imgX < currentHorseImage.width && 
      imgY >= 0 && imgY < currentHorseImage.height) {
    
    // Get the color at the mouse position in the image
    let col = currentHorseImage.get(imgX, imgY);
    
    // Check if it's red outline (255, 0, 0) OR black interior (0, 0, 0)
    // Using flexible detection for anti-aliasing
    let isRed = col[0] > 200 && col[1] < 50 && col[2] < 50;
    let isBlack = col[0] < 50 && col[1] < 50 && col[2] < 50;
    
    return isRed || isBlack;
  }
  return false;
}

function increaseSpeed() {
  if (cycleSpeed === 0) {  // Increase speed with each click
    // First click: start cycling at slow speed
    cycleSpeed = 2000; // 2 second between changes
    autoCycle = true;
  } else if (cycleSpeed > 0.1) {
    // Speed up by reducing the time between changes
    cycleSpeed = cycleSpeed * 0.7; // 20% faster each click
  } else {
    // Maximum speed reached
    cycleSpeed = 0.1; // Minimum 50ms between changes (very fast)
  }

  lastHorseChange = millis();
  // horseToPoints();
}