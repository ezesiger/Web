let myFont;
function preload() {
  ballet = loadFont("Ballet.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0, 0, 255);
    drawTitle();
}

function drawTitle() {
    textFont(ballet);
    textSize(45);
    fill(255);
 
    //text to points
    let points = font.textToPoints(
        "Why do horses feel like the internet?",10, windowHeight/3, 70,
        { sampleFactor: 0.5 }
    );

    // Draw a dot at each point.
    for (let p of points) {
        fill(255);
        stroke(255);
        point(p.x, p.y);
    }
}