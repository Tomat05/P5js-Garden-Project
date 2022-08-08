let res = 70;
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

			globe[i].push(createVector(x + map(noise(x, y, z), 0, 1, -10, 10), y + map(noise(y, z, x), 0, 1, -10, 10), z + map(noise(z, x, y), 0, 1, -10, 10)));
		}
	}
}



function draw() {
	background(0);
	directionalLight(255, 255, 255, -1, 0.5, -0.5);

	push();
	//stroke(0);
	noStroke();
	rotateX(80);
	rotateZ(rotation);
	for (let i = 0; i < res; i++) {
		push();
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j <= res; j++) {
			let v1 = globe[i][j];
			let v2 = globe[i+1][j];

			//normalMaterial();
			ambientMaterial(56, 255, 175);
			normal(v1.x, v1.y, v1.z);
			vertex(v1.x, v1.y, v1.z);

			normal(v2.x, v2.y, v2.z);
			vertex(v2.x, v2.y, v2.z);
		}
		endShape();
		pop();
	}
	pop();

	rotation += 0.005;
}