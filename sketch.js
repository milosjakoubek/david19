// create a loop for multiple images with .get
// change the nature of each image
// make them move independently

let img;
let xpos1 = 0;
let xpos2 = 0;
let xspeed1 = 0;
let xspeed2 = 0;
// let shard1 = 100;
// let shard2 = 200;

function preload(){
	img = loadImage('assets/david19.jpg');
}

// break down the image to x chunks
function setup() {
  createCanvas(img.width, img.height);
  pixelDensity(1);
  img.filter(GRAY);
  david1 = img.get(0, 0, img.width, img.height);
  david2 = img.get(0, 0, img.width, img.height);
  // shard = img.get(0, shard1, img.width, shard2);
  
}

function draw(){
  tint(255, 75)
  image(img, 0, 0);
  tint(255, 0, 0, 75);
  image(david1, xpos1, 0);
  tint(0, 255, 255, 75);
  image(david2, xpos2, 0);
  noTint();
  
  
    if(int(frameCount/10)%25 == int(0)) {
    shard(random(0,img.height - 100), 100);
    frameRate(8);
  } else if(int(frameCount/10)%15 == int(0)) {
    fshard(150, 100);
    frameRate(20);
  } else if(int(frameCount/2)%40 == int(0)) {
    mix(random(0, img.width - 150), 150);
    frameRate(5);
  } else {
    frameRate(60)
  }
  
  
// movement of red david
  if (xpos1 == 0) {
    xspeed1 = - 0.5;
  }
  if (xpos1 < -10) {
    xspeed1 = + 0.5;
  }
  xpos1 = xpos1 + xspeed1;
 
// movement of blue david
  if (xpos2 > 10) {
    xspeed2 = - 0.5;
  }
  if (xpos2 == 0) {
    xspeed2 = + 0.5;
  }
  xpos2 = xpos2 + xspeed2;
}


// rename parameters to y and w

function shard (shard1, shard2) {
  getshard = img.get(0, shard1, img.width, shard2);
  getshard.filter(POSTERIZE, 3);
  tint(random(150,247), 52, 122, 255);
  // tint(random(100, 239), random(0, 187), random(100, 255), 255);
  image(getshard, 0, shard1, img.width, shard2);
  // filter(INVERT);
}

function fshard (fshard1, fshard2) {
  getfshard = img.get(0, fshard1, img.width, fshard2);
  getfshard.filter(INVERT);
  tint(255, 0, 0, 255);
  image(getfshard, random(-50, 50), fshard1, img.width, fshard2);
}


function mix (mix1, mix2) {
  getmix = img.get(0, mix1, img.width, mix2);
  getmix.filter(THRESHOLD);
  // tint(0, 0, 255, 255);
  let soff = 150;
  image(getmix, 0, mix1 + soff, img.width, mix2);
}