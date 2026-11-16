async function setup() {
  createCanvas(200, 200);
  const folk = await connectFolk("http://folk-audrey.local:4273/ws");
}

function draw() {
  background(200);
  circle(100, 100, 50);
}
