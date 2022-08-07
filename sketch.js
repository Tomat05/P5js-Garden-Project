let cols, rows;
let w = 2000, h = 1000;
let scale = 20;

let flying = 0;

let terrain = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);

  cols = w / scale;
  rows = h / scale;
}

function draw() {
  angleMode(DEGREES);
  background(50);

  flying -= 0.01;

  let yOffset = flying;
  for (let y = 0; y < rows; y++) {
    let xOffset = 0;
    terrain[y] = [];
    for (let x = 0; x < cols; x++) {
      terrain[y].push(map(noise(xOffset, yOffset), 0, 1, -100, 100));
      xOffset += 0.1;
    }
    yOffset += 0.1;
  }

  push();
  fill(0, 0, 255);
  stroke(255);
  rotateX(60);
  translate(-w / 2, -h / 2)
  for (let y = 0; y < rows-1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scale, y * scale, terrain[y][x]);
      vertex(x * scale, (y + 1) * scale, terrain[y+1][x]);
    }
    endShape();
  }
  pop();
}
