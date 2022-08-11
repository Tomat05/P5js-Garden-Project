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
let trees = [];
let numtrees = 100;
let tree1;
let tree2;

let title;
let rotationX = 0;
let rotationY = 0;
let mouseXOld;
let mouseYOld;


function preload() {
    title = loadImage("P5Title.png"); // Using a texture as the in-built text requires 'createGraphic()' in WebGL mode which drastically decreases performance

    tree1 = loadModel("tree1.obj");
}



function setup() {
    angleMode(DEGREES);
	createCanvas(windowWidth, windowHeight, WEBGL);

    document.oncontextmenu = function() { return false; } // No menu appears on right click

    mouseXOld = mouseX; // Set initial mouseXOld and mouseYOld
    mouseYOld = mouseY;

    CreateStars(); // Generate everything
    Generate();

    // Button to save picture of canvas
    let saveButton = createButton("Save");
    saveButton.style("width: 75px; height: 30px");
    saveButton.position((width / 2) - (37.5), 120);
    saveButton.mousePressed(Save);
}



function draw() {
	background(0);
    angleMode(DEGREES); // WHY. IS. THE. DEFAULT. RADIANS. ALSKJDHSLDKJF >:/

    // TITLE
    push();
    translate(-218.5, -height / 2 + 20);
    texture(title);
    rect(0, 0, 437, 66.5);
    pop();

    // LIGHTS
	directionalLight(255, 255, 255, 0, 0, -1);
    //ambientLight(255);

    // STARS
	push();
	translate(0, 0, -300);
	for (let i = 0; i < numStars; i++) {
        noStroke();
		emissiveMaterial(starColours[i]);
		circle(starsX[i], starsY[i], starSize[i]);
	}
	pop();


    // PLANET
	push();
	noStroke();
	//rotateX(90);
    //rotateZ(rotationX);
    //rotateX(rotationY);

    // Draw Planet
	for (let i = 0; i < res1; i++) {
		push();
		beginShape(TRIANGLE_STRIP);
		for (let j = 0; j <= res1; j++) {
			let v1 = globe[i][j];
			let v2 = globe[i+1][j];

			//ambientMaterial(terrainColours[i][j]);
            fill(255);
			normal(v1.x, v1.y, v1.z);
			vertex(v1.x, v1.y, v1.z);

            //ambientMaterial(terrainColours[i+1][j]);
			normal(v2.x, v2.y, v2.z);
			vertex(v2.x, v2.y, v2.z);

            // DETAILS
            // if (trees[i][j] === true) {
            //     push();
            //     emissiveMaterial(i * 2);
            //     translate(v1.x - 10, v1.y + 20, v1.z + 20);
            //     rotateZ(map(i / 2, 0, res1 / 2, 0, 180));
            //     // rotateY(90 + map(j, 0, res1, 360, 0));
            //     cone(20, 50);
            //     // scale(15);
            //     // model(tree1);
            //     pop()
            // };
		}
		endShape();
		pop();
	}

    // ATMOSPHERE
    // push();
    // noStroke();
    // fill(baseAtmos);
    // sphere(r2);
    pop();

    // Set old positions to new positions ready for next frame
	mouseXOld = mouseX;
    mouseYOld = mouseY;
}


// General generation function
function Generate() {
    CreateDetails();
    CreatePlanet();
    CreateAtmos();

    generations++;
}



// Creates a planet
function CreatePlanet() {
    // Terrain colours
	baseTerrain = color(random(50, 255), random(50, 255), random(50, 255));
    let colourShift = random(-100, -20);
    terrainDetail = color(red(baseTerrain) + colourShift, green(baseTerrain) + colourShift, blue(baseTerrain) + colourShift);

    // Create array of vertices for terrain
	for (let i = 0; i <= res1; i++) {
        let lon = map(i, 0, res1, -90, 90);
        terrainColours[i] = []; // Create 2d array + clear array on multiple generations
		globe[i] = [];
		for (let j = 0; j <= res1; j++) {
			let lat = map(j, 0, res1, -180, 180);

			let x = r1 * sin(lat) * cos(lon);
			let y = r1 * sin(lat) * sin(lon);
			let z = r1 * cos(lat);

            // These are needed otherwise the noise stays the same until reload rather than changing every new planet
            let nX = x * generations;
            let nY = y * generations;
            let nZ = z * generations;

            globe[i].push(createVector(x + map(noise(nX, nY, nZ), 0, 1, -10, 10), y + map(noise(nY, nX, nZ), 0, 1, -10, 10), z + map(noise(nZ, nX, nY), 0, 1, -10, 10)));

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



// Atmospheric colour and radius
function CreateAtmos(){
    baseAtmos = color(random(100, 255), random(100, 255), random(100, 255), random(75, 125));
    r2 = random(250, 300); // atmosphere radius
}



// Creates background stars
function CreateStars() {
    // Create arrays of attributes & positions for stars
	for (let i = 0; i < numStars; i++) {
		starsX.push(random(-1920, 1920)); // Using an array of vectors didn't work so using separate arrays for x and y 
		starsY.push(random(-1080, 1080));
		starSize.push(random(1, 2));
		starColours.push(color(random(200, 255), random(200, 255), random(200, 255)));
	}
}



function CreateDetails() {
    trees = []; // Clear trees array on regenerate

    // Populate trees array
    for (let i = 0; i <= res1; i++) {
        trees[i] = [];
        for (let j = 0; j < res1; j++) {
            trees[i].push(false);
        }
    }

    // Replace some values with true (signifying a tree will be placed there)
    for (let i = 0; i < numtrees; i++) {
        let randMain = floor(random(res1));
        let randSub = floor(random(res1));
        
        trees[randMain][randSub] = true;
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



// Rotation stuff on mouse drag
function mouseDragged() {
    if (mouseButton === LEFT) {
        rotationX -= (mouseX - mouseXOld) / 4;
        rotationY -= (mouseY - mouseYOld) / 4;
    }
}