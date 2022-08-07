let res = 40;
let r = 200;
let globe = [];

let rotation = 0;


function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

	for (let i = 0; i <= res; i++) {
		let lat = map(i, 0, res, -HALF_PI, HALF_PI);
		globe[i] = [];
		for (let j = 0; j <= res; j++) {
			let lon = map(j, 0, res, -PI, PI);

			let x = r * sin(lon) * cos(lat);
			let y = r * sin(lon) * sin(lat);
			let z = r * cos(lon);

			globe[i].push(createVector(x + map(noise(x), 0, 1, -10, 10), y + map(noise(y), 0, 1, -10, 10), z + map(noise(z), 0, 1, -5, 5)));
		}
	}
}



function draw() {
	background(0);
	directionalLight(255, 255, 255, -1, -1, 0);

	//stroke(0);
	noStroke();
	rotateX(80);
	//rotateZ(rotation);
	for (let i = 0; i < res; i++) {
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j <= res; j++) {
			let v1 = globe[i][j];
			let v2 = globe[i+1][j];

			ambientMaterial(0, 175, 255);
			vertex(v1.x, v1.y, v1.z);
			vertex(v2.x, v2.y, v2.z);
		}
		endShape();
	}

	rotation += 0.005;
}