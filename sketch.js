let cols, rows;
let scale = 20;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
}

function draw() {
  background(50);

  push();
  for (let y = 0; y < rows; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      vertex(x * scale, y * scale);
    }
    endShape(CLOSE);
  }
  pop();
}
