let points = [];
let textPoints = [];
let horses = [];
let crawl = [];
let horsePoints = [];
let currentCrawl = 0;
let currentHorse = 0;
let cycleSpeed = 0; // 0 = static, higher = faster
let lastHorseChange = 0;
let currentHorseImage = null; 
let autoCycle = false;
let caption;
let title;
let countdownStart = 0;
let countdownActive = false;

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
  moto = loadImage('assets/M1.png');
  crawl[0] = loadImage('assets/Crawl1.png');
  crawl[1] = loadImage('assets/Crawl2.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  generateAllHorsePoints();
  loadHorsePoints(currentHorse);
}

function draw() {
  background(0, 0, 255);

  // Auto-cycle horses if speed is > 0
  if (autoCycle && cycleSpeed > 0 && millis() - lastHorseChange > cycleSpeed) {
    currentHorse = (currentHorse + 1) % horses.length;
    loadHorsePoints(currentHorse);
    lastHorseChange = millis();
  }

  drawTitle();
  drawPoints();
  drawCaption();
  drawCrawl();

  checkReset();


  //updateCursor();
}

function drawTitle() {
  //declare titles
  let title1 = "Why do horses feel like computers?";
  let title2 = "Why do horses feel like the internet?";
  let title3 = "Why do horses feel like technology?";
  let title4 = "Technology is constantly evolving"
  let title5 = "We shape technology the way we shape nature";
  let title6 = "How does technology shape us back in its own image?";
  let title7 = "How does technology shape our relationship to labor?";
  let title8 = "Are we in control or are we being controlled?";

  if (cycleSpeed <= 7 && cycleSpeed > 1) {
    title = title8;
  } else if (cycleSpeed <=1 && cycleSpeed > 0) {
    title = " ";
  } else if (cycleSpeed <= 10 && cycleSpeed > 0) {
    title = title7; 
  } else if (cycleSpeed <=40 && cycleSpeed > 0) {
    title = title6;
  } else if (cycleSpeed <= 57 && cycleSpeed > 0) {
    title = title5; 
  } else if (cycleSpeed <=236 && cycleSpeed > 0) {
    title = title4;
  } else if (cycleSpeed <= 686 && cycleSpeed > 0) {
    title = title3; 
  } else if (cycleSpeed <= 1400 && cycleSpeed > 0) {
    title = title2; 
  } else  {
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
  let caption1 = "again";
  let caption2 = "faster";
  let caption3 = "faster horses faster computers";
  let caption4 = "step forwards";
  let caption5 = "optimize your life";
  let caption6 = "you can never be fast enough";
  let caption7 = "you will never be fast enough";

  

  if (cycleSpeed <= 1 && cycleSpeed > 0) {
    caption = " ";
  } else if (cycleSpeed <= 1.3 && cycleSpeed > 0) {
    caption = caption6;
  } else if (cycleSpeed <= 5 && cycleSpeed > 0) {
    caption = caption5;
  } else if (cycleSpeed <= 14 && cycleSpeed > 0) {
    caption = caption4;
  } else if (cycleSpeed <= 236 && cycleSpeed > 0) {
    caption = caption3;
  } else if (cycleSpeed <= 980 && cycleSpeed > 0) {
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
  if (cycleSpeed <= 200 && cycleSpeed > 1) {
    image(crawl[currentCrawl], 10, 10, 350, 170);
  }
}

function generateAllHorsePoints() {
  //generate and store points for all horse images
  for (let i = 0; i < horses.length; i++) {
    horsePoints[i] = generateHorsePoints(i);
  }
}

function generateHorsePoints(horseIndex){
  let pointsArray = [];
  let img = horses[horseIndex]; 

  //create resized copy if needed
  let displayImg = img;
  if (windowHeight / 1.5 < img.height) {
    displayImg = createImage(img.width, img.height);
    displayImg.copy(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
    displayImg.resize(0, windowHeight / 1.1);
  }

  // align image
  let offsetX = (width - img.width);
  let offsetY = (height - img.height);

  //turn horse image into points
    for (let i = 0; i < 1000; i++) {
      let x = random(displayImg.width);
      let y = random(displayImg.height); 
      let col = displayImg.get(x, y);
      if (col[0] === 255 && col[1] === 0 && col[2] === 0){
        pointsArray.push(createVector(x + offsetX, y + offsetY));
      } else {
        i--;
      }
  }

  return pointsArray;
}

function loadHorsePoints(horseIndex) {
  //load pregenerated points
  points = horsePoints[horseIndex];
  currentHorseImage = horses[horseIndex]; //click detection
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

// function updateCursor() {
//   // Check if mouse is over crawl image
//   let overCrawl = (cycleSpeed <= 200 && cycleSpeed > 0) && 
//                   (mouseX >= 10 && mouseX <= 360 && mouseY >= 10 && mouseY <= 180);
  
//   // Check if mouse is over horse
//   let overHorse = isMouseOverHorse();
  
//   // Change cursor to HAND if over either, otherwise ARROW
//   if (overCrawl || overHorse) {
//     cursor(HAND);
//   } else {
//     cursor(ARROW);
//   }
// }

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

function reset() {
  cycleSpeed = 0;
  autoCycle = false;
  currentHorse = 0;
  currentCrawl = 0;
  countdownActive = false;
  loadHorsePoints(currentHorse);
}

function checkReset() {
  if (cycleSpeed > 0 && cycleSpeed < 1 && !countdownActive) {
    // Start countdown when speed enters the critical range
    countdownStart = millis();
    countdownActive = true;
  }
  
  if (countdownActive) {
    let elapsed = millis() - countdownStart;
    
    // Reset when countdown finishes
    if (elapsed >= 10000) {
      reset();
    }
  }
}