async function setup() {
  connectFolk("http://folk-audrey.local:4273/ws");
  viewport = watchFor("is a viewport");
  canvas = createCanvas(1000, 500);
}

function draw() {
  background(170, 230, 250);

  fill(255);
  noStroke();
  arc(180, mouseY, 60, 60, (PI * 7) / 8, PI + PI / 8);
  fill(200);
  circle(125, mouseY, 60);
  fill(0);
  circle(135, mouseY - 8, 5);
  }
}
