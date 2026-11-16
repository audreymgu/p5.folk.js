async function setup() {
  connectFolk("http://folk-audrey.local:4273/ws");
  viewport = watchFor("is a viewport");
  createCanvas(200, 200);
}

function draw() {
  background(200);
  circle(100, 100, 50);
  if (viewport.id) {
    text("Viewport is " + viewport.id, 20, 30);
  }
}
