// Terrain
let res1 = 70;
let r1 = 200;
let globe = [];
let baseTerrain;
let terrainDetail;
let terrainColours = [];
let clicks = 1;

// Atmosphere
let res2 = 70;
let r2;
let atmos = [];
let baseAtmos;

// Stars
let numStars = 600;
let starsX = [];
let starsY = [];
let starSize = [];
let starColours = [];

// Title and other text
let _text;


let rotation = 0;


function setup() {
    angleMode(DEGREES);

	let canv = createCanvas(windowWidth, windowHeight, WEBGL);

    _text = createGraphics(600, 75);
    _text.textFont('Source Code Pro');
    _text.textAlign(CENTER);
    _text.textSize(50);
    _text.fill(255);
    _text.noStroke();
    _text.text('P5.js Garden Project', 300, 50);

    document.oncontextmenu = function() { return false; } // No menu appears on right click
    canv.mousePressed(setup);

    // Terrain and atmosphere colours
	baseTerrain = color(random(50, 255), random(50, 255), random(50, 255));
    let colourShift = random(-100, -20);
    terrainDetail = color(red(baseTerrain) + colourShift, green(baseTerrain) + colourShift, blue(baseTerrain) + colourShift);

    baseAtmos = color(random(100, 255), random(100, 255), random(100, 255), random(75, 125));
    r2 = random(210, 220); // atmosphere resolution

    // Create list of vertices for terrain
	for (let i = 0; i <= res1; i++) {
        let lon = map(i, 0, res1, -180, 180);
        terrainColours[i] = [];
		globe[i] = [];
		for (let j = 0; j <= res1; j++) {
			let lat = map(j, 0, res1, -90, 90);

			let x = r1 * sin(lon) * cos(lat);
			let y = r1 * sin(lon) * sin(lat);
			let z = r1 * cos(lon);

            // These are needed otherwise planet terrain stays the same until reload rather than changing every click
            let cX = x * clicks;
            let cY = y * clicks;
            let cZ = z * clicks;

            globe[i].push(createVector(x + map(noise(cX, cY, cZ), 0, 1, -10, 10), y + map(noise(cY, cX, cZ), 0, 1, -10, 10), z + map(noise(cZ, cX, cY), 0, 1, -10, 10)));

            let whichColour = round(random());
            switch (whichColour) {
                case 1:
                    terrainColours[i].push(baseTerrain);
                    break;
                
                default:
                    terrainColours[i].push(terrainDetail);
                    break;
            }
		}
	}

    // Create list of vertices for atmosphere
    for (let i = 0; i <= res2; i++) {
        let lon = map(i, 0, res2, -180, 180);
		atmos[i] = [];
		for (let j = 0; j <= res2; j++) {
			let lat = map(j, 0, res2, -90, 90);

			let x = r2 * sin(lon) * cos(lat);
			let y = r2 * sin(lon) * sin(lat);
			let z = r2 * cos(lon);

			atmos[i].push(createVector(x, y, z));
		}
	}

    // Create lists attributes & positions for stars
	for (let i = 0; i < numStars; i++) {
		starsX.push(random(-1920, 1920));
		starsY.push(random(-1080, 1080));
		starSize.push(random(1, 2));
		starColours.push(color(random(200, 255), random(200, 255), random(200, 255)));
	}

    clicks++;

    let saveButton = createButton("save");
    saveButton.style("width: 75px; height: 30px");
    saveButton.position((width / 2) - (37.5), 100);
    saveButton.mousePressed(Save);
}



function draw() {
	background(0);
    angleMode(DEGREES);

    push();
    noStroke();
    translate(0, -height / 2 + 50);
    texture(_text);
    plane(600, 75);
    pop();

	directionalLight(255, 255, 255, -0, 0, -1);
	//ambientLight(255);

    // Draw stars
	push();
	translate(0, 0, -300);
	for (let i = 0; i < numStars; i++) {
        noStroke();
		emissiveMaterial(starColours[i]);
		circle(starsX[i], starsY[i], starSize[i]);
	}
	pop();

	push();
	noStroke();
	rotateX(90);
	rotateZ(90);

    // Draw Planet
	for (let i = 0; i < res1; i++) {
		push();
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j <= res1; j++) {
			let v1 = globe[i][j];
			let v2 = globe[i+1][j];

			ambientMaterial(terrainColours[i][j]);
			normal(v1.x, v1.y, v1.z);
			vertex(v1.x, v1.y, v1.z);

            ambientMaterial(terrainColours[i+1][j]);
			normal(v2.x, v2.y, v2.z);
			vertex(v2.x, v2.y, v2.z);
		}
		endShape();
		pop();
	}
    pop();

    push();
    noStroke();
    for (let i = 0; i < res2; i++) {
        push();
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j <= res2; j++) {
            let v1 = atmos[i][j];
            let v2 = atmos[i+1][j];

            fill(baseAtmos);
            normal(v1.x, v1.y, v1.z);
            vertex(v1.x, v1.y, v1.z);

            normal(v2.x, v2.y, v2.z);
            vertex(v2.x, v2.y, v2.z);
        }
        endShape();
        pop();
    }
    pop();

	// rotation += 0.0025;
}



function Save() {
    resizeCanvas(2560, 1440);
    save("planet.png")
    resizeCanvas(windowWidth, windowHeight);
}