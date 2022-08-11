// Terrain
let res1 = 70;
let r1 = 200;
let globe = [];
let baseTerrain;
let terrainDetail;
let terrainColours = [];
let generations = 1;

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

// Trees
let trees;
let numtrees = 30;

let camera;
let title;
let rotation = 0;



function preload() {
    title = loadImage("P5Title.png"); // Using a texture as the in-built text requires 'createGraphic()' in WebGL mode which drastically decreases performance
}



function setup() {
    angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight, WEBGL);

    document.oncontextmenu = function() { return false; } // No menu appears on right click

    camera = createCamera();

    Generate();

    // Button to save picture of canvas
    let saveButton = createButton("save");
    saveButton.style("width: 75px; height: 30px");
    saveButton.position((width / 2) - (37.5), 120);
    saveButton.mousePressed(Save);
}



function draw() {
	background(0);
    angleMode(DEGREES); // WHY. IS. THE. DEFAULT. RADIANS. ALSKJDHSLDKJF >:/

    // Title
    push();
    translate(-288, -height / 2 + 20);
    texture(title);
    rect(0, 0, 576, 324);
    pop();

	directionalLight(255, 255, 255, -0, 0, -1);

    // Draw stars
	push();
	translate(0, 0, -300);
	for (let i = 0; i < numStars; i++) {
        noStroke();
		emissiveMaterial(starColours[i]);
		circle(starsX[i], starsY[i], starSize[i]);
	}
	pop();

	//ambientLight(255);

	push();
	noStroke();
	//rotateX(90);
	//rotateZ(rotation);

    // Draw Planet
	for (let i = 0; i < res1; i++) {
		push();
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j <= res1; j++) {
			let v1 = globe[i][j];
			let v2 = globe[i+1][j];

            fill(v1.x, v1.y, v1.z);
			//ambientMaterial(terrainColours[i][j]);
			normal(v1.x, v1.y, v1.z);
			vertex(v1.x, v1.y, v1.z);

            //ambientMaterial(terrainColours[i+1][j]);
            fill(v2.x, v2.y, v2.z);
			normal(v2.x, v2.y, v2.z);
			vertex(v2.x, v2.y, v2.z);
		}
		endShape();
		pop();
	}

    // push();
    // noStroke();
    // for (let i = 0; i < res2; i++) {
    //     push();
    //     beginShape(TRIANGLE_STRIP);
    //     for (let j = 0; j <= res2; j++) {
    //         let v1 = atmos[i][j];
    //         let v2 = atmos[i+1][j];

    //         fill(baseAtmos);
    //         normal(v1.x, v1.y, v1.z);
    //         vertex(v1.x, v1.y, v1.z);

    //         normal(v2.x, v2.y, v2.z);
    //         vertex(v2.x, v2.y, v2.z);
    //     }
    //     endShape();
    //     pop();
    // }
    pop();

    // // Draw details
    // push();
    // noStroke();
    // for (let i = 0; i < numtrees; i++) {
    //     emissiveMaterial(255);
    //     translate(trees[i]);
    //     box(10, 10, 10);
    // }
    // pop();

	rotation += 0.5;
    //print(camera.eyeX, camera.eyeY, camera.eyeZ);
}


// General generation function
function Generate() {
    CreateStars();
    CreatePlanet();
    CreateAtmos();
    CreateDetails();

    generations++;
}



// Creates a planet
function CreatePlanet() {
    // Terrain and atmosphere colours
	baseTerrain = color(random(50, 255), random(50, 255), random(50, 255));
    let colourShift = random(-100, -20);
    terrainDetail = color(red(baseTerrain) + colourShift, green(baseTerrain) + colourShift, blue(baseTerrain) + colourShift);

    // Create array of vertices for terrain
	for (let i = 0; i <= res1; i++) {
        let lon = map(i, 0, res1, -180, 180);
        terrainColours[i] = []; // Create 2d array + clear array on multiple generations
		globe[i] = [];
		for (let j = 0; j <= res1; j++) {
			let lat = map(j, 0, res1, -90, 90);

			let x = r1 * sin(lon) * cos(lat);
			let y = r1 * sin(lon) * sin(lat);
			let z = r1 * cos(lon);

            // These are needed otherwise the noise stays the same until reload rather than changing every new planet
            let nX = x * generations;
            let nY = y * generations;
            let nZ = z * generations;

            globe[i].push(createVector(x + map(noise(nX, nY, nZ), 0, 1, -10, 10), y + map(noise(nY, nX, nZ), 0, 1, -10, 10), z + map(noise(nZ, nX, nY), 0, 1, -10, 10)));
            //globe[i].push(createVector(x, y, z));

            // Choose between base and detail colour for each vertex
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
}



// Creates an atmosphere
function CreateAtmos(){
    baseAtmos = color(random(100, 255), random(100, 255), random(100, 255), random(75, 125));
    r2 = random(210, 220); // atmosphere radius

    // Create array of vertices for atmosphere
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
}



// Creates background stars
function CreateStars() {
    // Create arrays attributes & positions for stars
	for (let i = 0; i < numStars; i++) {
		starsX.push(random(-1920, 1920)); // Using an array of vectors didn't work so using separate arrays for x and y 
		starsY.push(random(-1080, 1080));
		starSize.push(random(1, 2));
		starColours.push(color(random(200, 255), random(200, 255), random(200, 255)));
	}
}



function CreateDetails() {
    trees = []; // Clear trees list

    // Create array of vertices for trees
    for (let i = 0; i < numtrees; i++) {
        let mainList = floor(random(globe.length)); // ---------->
        let subList = floor(random(globe[mainList].length));// --> because it's a 2d array
        trees.push(globe[mainList][subList]);
    }
}



// Save a 1440p picture of the canvas
function Save() {
    resizeCanvas(2560, 1440);
    save("planet.png")
    resizeCanvas(windowWidth, windowHeight);
}



// Re-generate planet on enter key pressed
function keyPressed() {
    if (keyCode === ENTER) {
        Generate();
    }
}