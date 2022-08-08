let res = 70;
let r = 200;
let globe = [];

let baseColour;

let numObjects;
let objects = [];

let numStars = 500;
let starsX = [];
let starsY = [];
let starSize = [];
let starColours = [];

let rotation = 0;
let canRotate = false;
let canZoom = false;
xOffset = 0;


function setup() {
	createCanvas(windowWidth, windowHeight, WEBGL);

    document.oncontextmenu = function() { return false; }

	baseColour = color(random(50, 255), random(50, 255), random(50, 255));
    numObjects = random(r / 4, r / 2);

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

	for (let i = 0; i < numStars; i++) {
		starsX.push(random(-width, width));
		starsY.push(random(-height, height));
		starSize.push(random(2, 5));
		starColours.push(color(random(150, 255), random(150, 255), random(150, 255)));
	}
}



function draw() {
	background(0);

	//directionalLight(255, 255, 255, 0, 0, -1);
	//ambientLight(255);

    camera(0, 0, (height / 2) / tan(PI / 6), 0, 0, 0, 0, 1, 0);

    // Draw stars
	push();
	translate(0, 0, -300);
	for (let i = 0; i < numStars; i++) {
		emissiveMaterial(starColours[i]);
		circle(starsX[i], starsY[i], starSize[i]);
	}
	pop();

	push();
	noStroke();
	rotateX(80);
	rotateZ(rotation);
    
    // Draw Objects
    push();
    for (let i = 0; i < numObjects; i++) {
        emissiveMaterial(255);
        translate(globe[i], random(globe.length));
        box(5, 5, 5);
    }
    pop();

    // Draw Planet
	for (let i = 0; i < res; i++) {
		push();
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j <= res; j++) {
			let v1 = globe[i][j];
			let v2 = globe[i+1][j];

			//normalMaterial();
			//ambientMaterial(baseColour);
            fill(v1.x, v1.y, v1.z);
			normal(v1.x, v1.y, v1.z);
			vertex(v1.x, v1.y, v1.z);

            fill(v2.x, v2.y, v2.z);
			normal(v2.x, v2.y, v2.z);
			vertex(v2.x, v2.y, v2.z);

		}
		endShape();
		pop();
	}
	pop();

	//rotation += 0.005;
}