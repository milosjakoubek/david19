let img;
let xoff1 = 0;
let xoff2 = 0;
let xspeed1 = 0;
let xspeed2 = 0;

// captures millis
let mstime = 0;


function preload() {
  img = loadImage('assets/david19.jpg');
}

// global setup function
function setup() {
  initSetup();
}

// global draw function
function draw() {
  initDraw();
}

// local setup function
function initSetup() {
  mstime = millis();
  createCanvas(img.width, img.height);
  // adjust pixelDensity to default
  pixelDensity(1);
  img.filter(GRAY);
  // get pixels from original asset
  reddavid = img.get(0, 0, img.width, img.height);
  bluedavid = img.get(0, 0, img.width, img.height);
}

// local draw function
function initDraw() {
  // draw original asset with gray filter
  tint(255, 75)
  image(img, 0, 0);
  // tint original asset to red and draw [red David]
  tint(255, 0, 0, 75);
  image(reddavid, xoff1, 0);
  // tint original asset to shade of blue and draw [blue David]
  tint(0, 255, 255, 75);
  image(bluedavid, xoff2, 0);
  noTint();

  // movement of red david
  if (xoff1 == 0) {
    xspeed1 = -0.5;
  }
  if (xoff1 < -10) {
    xspeed1 = +0.5;
  }
  xoff1 = xoff1 + xspeed1;

  // movement of blue david
  if (xoff2 > 10) {
    xspeed2 = -0.5;
  }
  if (xoff2 == 0) {
    xspeed2 = +0.5;
  }
  xoff2 = xoff2 + xspeed2;

  // draw shards at slowed framerate with pause in between
  if (int(frameCount / 10) % 25 == int(0)) {
    vshard(random(0, img.width - 100), 100);
    frameRate(15);
  } else if (int(frameCount / 10) % 15 == int(0)) {
    hshard(200, 50);
    frameRate(20);
  } else if (int(frameCount / 2) % 40 == int(0)) {
    mix(random(0, img.height - 300), 150);
    frameRate(10);
  } else {
    frameRate(60)
  }

  // draw static overlay
  if (millis() > mstime + 12000) {
    static(5, 5);
  }
  // stop drawing statick overlay
  if (millis() > mstime + 14000) {
    noLoop();
  } else {
    loop()
  }
}

// mouse press trigger to reset sketch

function mousePressed() {
  initSetup();
  initDraw();
}


// vertical shards overlay

function vshard(x, y) {
  getvshard = img.get(x, 0, y, img.height);
  getvshard.filter(POSTERIZE, 3);
  tint(random(50, 247), 0, 255, 255);
  image(getvshard, x, 0, y, img.height);
}

// horizontal shard overlay (eyes)

function hshard(y, h) {
  gethshard = img.get(0, y, img.width, h);
  gethshard.filter(INVERT);
  image(gethshard, random(-15, 15), y, img.width, h);
}

// shuffled horizontal overlay

function mix(y, h) {
  getmix = img.get(0, y, img.width, h);
  getmix.filter(THRESHOLD);
  tint(random(50, 247), 0, 255, 255);
  let yoff = 150;
  image(getmix, 0, y + yoff, img.width, h);
}

// static overlay

function static(w, h) {
  for (var x = 0; x < img.width; x += w) {
    for (var y = 0; y < img.height; y += h) {
      noStroke();
      fill(random(1, 255), random(1, 255), random(1, 255), 100);
      rect(x, y, w, h);
    }
  }
}
