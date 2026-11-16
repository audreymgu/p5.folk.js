async function setup() {
  createCanvas(200, 200);
  connectFolk("http://folk-audrey.local:4273/ws");
  viewport = watchFor("is a viewport");
}

function draw() {
  background(200);
  circle(100, 100, 50);

  if (viewport.id) {
    text("Viewport is " + viewport.id, 20, 30);
  }
}
