let bird = [];
let sky, space, sunset;
let value = 0;
let delta = 0;
let altitude = 1;
let distanceTracker;

async function setup() {
// folk initialization
  connectFolk("http://folk-audrey.local:4273/ws");
  distanceTracker = watchFor("/bird/ is distance /distance/ from /earth/");

  // sketch properties
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

  // get real world distance
  if (distanceTracker?.current) {
    altitude = round(
      map(Number(distanceTracker.current.distance), 0.3, 0.6, 750, -250, true),
    );
  }

  if (altitude < 0) {
    delta = abs(max(altitude, -100)) / 20000;
  } else if (altitude > height) {
    delta = (min(altitude - height, 100) * -1) / 20000;
  } else {
    delta = 0;
  }

  // draw bird
  fill(255);
  noStroke();
fill(255);
  arc(180, altitude, 80, 80, (PI * 7) / 8, PI + PI / 8);
  fill(200);
  circle(125, altitude, 80);
  fill(0);
  circle(135, altitude - 8, 10);

  // display altitude
  fill(0);
  text(altitude, 20, 480);

  // display folk connection
  if (isFolkReady()) {
    fill(0, 255, 0);
    text("Folk is connected", 20, 30);
  } else {
    fill(255, 0, 0);
    text("Folk not connected", 20, 30);
  }
}
