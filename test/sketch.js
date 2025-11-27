let horses = [];
let currentHorse = 0;

function preload(){
   horses[0] = loadImage('H1.png');
   horses[1] = loadImage('H2.png');
   horses[2] = loadImage('H3.png');
   horses[3] = loadImage('H4.png');
   horses[4] = loadImage('H5.png');
   horses[5] = loadImage('H6.png');
   horses[6] = loadImage('H7.png');
   horses[7] = loadImage('H8.png');
   horses[8] = loadImage('H8.png');
   horses[9] = loadImage('H10.png');
   horses[10] = loadImage('H11.png');
   horses[11] = loadImage('H12.png');
}
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  let img = horses[currentHorse];

  image(img,0,0)
}

function mousePressed(){
  currentHorse = (currentHorse + 1) % horses.length;
}