let bird = [];
let sky, space, sunset;
let value = 0;
let delta = 0;
let currentSky;

async function setup() {
  connectFolk("http://folk-audrey.local:4273/ws");
  viewport = watchFor("is a viewport");
  canvas = createCanvas(1000, 500);
  sky = color(170, 230, 250);
  space = color(10, 55, 80);
  sunset = color(255, 225, 170);
  currentSky = sky;
}

function draw() {
  // draw background
  value = constrain(value + delta, 0, 1);
  if (value < 0.5) {
    let localValue = map(value, 0, 0.5, 0, 1);
    currentSky = lerpColor(sunset, sky, localValue);
    background(currentSky);
  } else {
    let localValue = map(value, 0.5, 1, 0, 1);
    currentSky = lerpColor(sky, space, localValue);
    background(currentSky);
  }

  if (mouseY < 0) {
    delta = abs(max(mouseY, -100)) / 10000;
  } else if (mouseY > height) {
    delta = (min(mouseY - height, 100) * -1) / 10000;
  } else {
    delta = 0;
  }

  // draw bird
  fill(255);
  noStroke();
  arc(180, mouseY, 60, 60, (PI * 7) / 8, PI + PI / 8);
  fill(200);
  circle(125, mouseY, 60);
  fill(0);
  circle(135, mouseY - 8, 5);

  // display mouseY
  text(value, 30, 470);

  // display folk connection
  if (isFolkReady()) {
    fill(0, 255, 0);
    text("Folk is connected", 20, 30);
  } else {
    fill(255, 0, 0);
    text("Folk not connected", 20, 30);
  }
}
