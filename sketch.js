// TERRAIN
let res1 = 70;
let r1 = 200;
let globe = [];
let baseTerrain;
let terrainDetail;
let generations = 1;

let terrainColours = [];
let colourShift;
let usePicker;
let pickerCheckBox;
let colourPick;
let paletteType;
let palette = 2;

// ATMOSPHERE
let res2 = 70;

let r2;
let minR2 = 260;
let maxR2 = 320;
let minR2Slide;
let maxR2Slide;

let baseAtmos;
let atmosPaletteType;
let atmosPalette = 3;

// STARS
let numStars = 600;
let starsX = [];
let starsY = [];
let starSize = [];
let starColours = [];

// TREES
let trees = [];
let numTrees = 2000;
let numTreesSlide;

let treePaletteType;
let treePalette = 1;

let treeHeights = [];
let minHeightSlide;
let maxHeightSlide;
let minHeight = 30;
let maxHeight = 100;

let leafSizes = [];
let leafMinSizeSlide;
let leafMaxSizeSlide;
let leafMinSize = 7;
let leafMaxSize = 14;

// MOUSE
let rotationX = 0;
let mouseXOld;
let zoom = 1;

// SIDEBAR
let sidebar;
let reveal = false;
let slide;

// SCREENSHOT
let title;
let screenshot = false;



function preload() {
    title = loadImage("P5Title.png"); // Using a texture as the in-built text requires 'createGraphic()' in WebGL mode which drastically decreases performance
}



function setup() {
    angleMode(DEGREES);

	createCanvas(windowWidth, windowHeight, WEBGL);

    document.oncontextmenu = function() { return false; } // No menu appears on right click

    mouseXOld = mouseX; // Set initial mouseXOld

    // SIDEBAR
    slide = -200;

    // Checkbox for whether to use picker or random colours
    pickerCheckBox = createCheckbox(false);
    pickerCheckBox.changed(CheckColourType);

    // Colour picker for planet colour
    colourPick = createColorPicker();

    // Dropdown for selecting colour palette type of planet
    paletteType = createSelect();
    paletteType.option('Analogous');
    paletteType.option('Complementary');
    paletteType.option('Uniform');
    paletteType.selected('Analogous');
    paletteType.changed(ChangeColourPalette);

    // Dropdown for selecting colour palette type of trees
    treePaletteType = createSelect();
    treePaletteType.option('Analogous');
    treePaletteType.option('Complementary');
    treePaletteType.option('Uniform');
    treePaletteType.selected('Complementary');
    treePaletteType.changed(ChangeTreePalette);

    // Sliders for tree min/max height
    minHeightSlide = createSlider(0, 150, 30);
    minHeightSlide.changed(ChangeTreeHeights);
    maxHeightSlide = createSlider(0, 150, 100);
    maxHeightSlide.changed(ChangeTreeHeights);

    // Sliders for leaf min/max size
    leafMinSizeSlide = createSlider(0, 20, 7);
    leafMinSizeSlide.changed(ChangeLeafSizes);
    leafMaxSizeSlide = createSlider(0, 20, 14);
    leafMaxSizeSlide.changed(ChangeLeafSizes);

    // Slider for number of trees
    numTreesSlide = createSlider(0, 2000, 1000);
    numTreesSlide.changed(ChangeNumTrees);

    // Sliders for atmosphere min/max size
    minR2Slide = createSlider(189, 400, 260);
    minR2Slide.changed(ChangeAtmosRange);
    maxR2Slide = createSlider(180, 400, 320)
    maxR2Slide.changed(ChangeAtmosRange);

    // Dropdown for atmosphere colour palette type
    atmosPaletteType = createSelect();
    atmosPaletteType.option('Analogous');
    atmosPaletteType.option('Complemenatary');
    atmosPaletteType.option('Uniform');
    atmosPaletteType.option('Random');
    atmosPaletteType.selected('Random');
    atmosPaletteType.changed(ChangeAtmosPalette);

    // Button to save picture of canvas
    // let saveButton = createButton("Save");
    // saveButton.style("width: 75px; height: 30px");
    // saveButton.position(10, 20);
    // saveButton.mousePressed(Save);

    // GENERATION
    CreateStars(); // Generate everything
    Generate();
}



function draw() {
	background(0);
    angleMode(DEGREES); // WHY. IS. THE. DEFAULT. RADIANS. ALSKJDHSLDKJF >:/

    // SIDEBAR
    pickerCheckBox.position(slide + 10, 10);
    colourPick.position(slide + 10, 35);
    paletteType.position(slide + 10, 70);
    treePaletteType.position(slide + 10, 120);
    minHeightSlide.position(slide + 10, 150);
    maxHeightSlide.position(slide + 10, 170);
    leafMinSizeSlide.position(slide + 10, 200)
    leafMaxSizeSlide.position(slide + 10, 220)
    numTreesSlide.position(slide + 10, 250);
    minR2Slide.position(slide + 10, 280);
    maxR2Slide.position(slide + 10, 300);
    atmosPaletteType.position(slide + 10, 330);

    push();
    fill(20, 20, 20);
    translate(0, -height / 2);
    rect(-width / 2 + slide, 0, 200, height);

    if (mouseX <= 15) {
        reveal = true;
    }
    if (mouseX > 200) {
        reveal = false;
    }

    if (reveal) {
        if (slide < 0) {
            slide += 10;
        }
    }
    else {
        if (slide > -200) {
            slide -= 10;
        }
    }
    pop();

    // TITLE
    if (screenshot) {
        push();
        translate(-width / 2 + 20, -height / 2 + 20);
        texture(title);
        rect(0, 0, 437, 44.5);
        pop();
    }

    // LIGHTS
	// directionalLight(255, 255, 255, -1, 0, 0);
    ambientLight(255);

    // STARS
	push();
	translate(0, 0, -300);
	for (let i = 0; i < numStars; i++) {
        noStroke();
		emissiveMaterial(starColours[i]);
		circle(starsX[i], starsY[i], starSize[i]);
	}
	pop();

    scale(zoom);
    // PLANET
    push();
    noStroke();
    rotateX(90);
    rotateZ(rotationX);

    // Draw Planet
    for (let i = 0; i < res1; i++) {
        push();
        beginShape(TRIANGLE_STRIP);
        for (let j = 0; j <= res1; j++) {
            let v1 = globe[i][j];
            let v2 = globe[i+1][j];

            ambientMaterial(terrainColours[i][j]);
            //fill(255);
            normal(v1.x, v1.y, v1.z);
            vertex(v1.x, v1.y, v1.z);

            ambientMaterial(terrainColours[i+1][j]);
            normal(v2.x, v2.y, v2.z);
            vertex(v2.x, v2.y, v2.z);

            // DETAILS
            if (trees[i][j] === true) {
                push();
                let treeColour;
                switch (treePalette) {
                    case 0:
                        treeColour = terrainColours[i][j];
                        break;
                    
                    case 1:
                        treeColour = color(255 - red(terrainColours[i][j]), 255 - green(terrainColours[i][j]), 255 - blue(terrainColours[i][j]));
                        break;
                    
                    default:
                        treeColour = color(red(terrainColours[i][j]) + colourShift, green(terrainColours[i][j]) + colourShift, blue(terrainColours[i][j]) + colourShift);
                        break;
                }
                ambientMaterial(treeColour);
                translate(v1.x, v1.y, v1.z);
                rotateZ(90 + map(i / 2, 0, res1 / 2, 0, 180));
                rotateY(90 + map(j, 0, res1, 360, 0));
                box(treeHeights[i][j], 5, 5);

                ambientMaterial(treeColour);
                translate(treeHeights[i][j] / 2, 0, 0);
                sphere(leafSizes[i][j]);
                pop()
            };
        }
        endShape();
        pop();
    }
    pop();

    // ATMOSPHERE
    push();
    noStroke();
    rotateX(90);
    fill(baseAtmos);
    sphere(r2, res2, res2);
    pop();

    // Set old positions to new positions ready for next frame
	mouseXOld = mouseX;
}



// General generation function
function Generate() {
    colourShift = random(-100, -20);

    CreatePlanet();
    CreateAtmos();
    CreateDetails();

    generations++;
}



// Creates a planet
function CreatePlanet() {

    // Terrain colours
    if (usePicker) {
        baseTerrain = colourPick.value();
    }
    else {
        baseTerrain = color(random(50, 255), random(50, 255), random(50, 255));
    }

    switch (palette) {
        case 0:
            terrainDetail = baseTerrain;
            break;
        
        case 1:
            terrainDetail = color(255 - red(baseTerrain), 255 - green(baseTerrain), 255 - blue(baseTerrain));
            break;
        
        default:
            terrainDetail = color(red(baseTerrain) + colourShift, green(baseTerrain) + colourShift, blue(baseTerrain) + colourShift);
            break;
    }

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
    switch (atmosPalette) {
        case 0:
            baseAtmos = color(red(baseTerrain) + random(-100, -20), green(baseTerrain) + random(-100, -20), blue(baseTerrain) + random(-100, -20), random(30, 100));
            break;

        case 1:
            baseAtmos = color(red(baseTerrain), green(baseTerrain), blue(baseTerrain), random(30, 100));
            break;

        case 2:
            baseAtmos = color(255 - red(baseTerrain), 255 - green(baseTerrain), 255 - blue(baseTerrain), random(30, 100));
            break;

        default:
            baseAtmos = color(random(100, 255), random(100, 255), random(100, 255), random(30, 100), random(30, 100));
            break;
    }
    r2 = random(minR2, maxR2); // atmosphere radius
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
        treeHeights[i] = [];
        leafSizes[i] = [];
        for (let j = 0; j < res1; j++) {
            trees[i].push(false);
            leafSizes[i].push(0);
            treeHeights[i].push(0);
        }
    }

    // Replace some values with true (signifying a tree will be placed there)
    for (let i = 0; i < numTrees; i++) {
        let randMain = floor(random(res1));
        let randSub = floor(random(res1));
        
        trees[randMain][randSub] = true;
        leafSizes[randMain][randSub] = (random(leafMinSize, leafMaxSize));
        treeHeights[randMain][randSub] = (random(minHeight, maxHeight));
    }
}



// Save a 1440p picture of the canvas
function Save() {
    screenshot = true;
    resizeCanvas(2560, 1440);
    save("planet.png")
    resizeCanvas(windowWidth, windowHeight);
    screenshot = false;
}



// Re-generate planet on enter key pressed
function keyPressed() {
    if (keyCode === 32) {
        Generate();
    }
}



// Movement stuff on mouse drag
function mouseDragged() {
    if (!reveal) {
        switch (mouseButton) {
            case LEFT:
                rotationX -= (mouseX - mouseXOld) / 4;
                break;
    
            case RIGHT:
                zoom += (mouseX - mouseXOld) / 500;
                zoom = constrain(zoom, 0.2, 2);
                break;
            
            default:
                break;
        }
    }
}



function mousePressed() {
    if (mouseButton === CENTER) {
        rotationX = 0;
        zoom = 1;
    }
}



// Function that decides whether to use random colours or chosen colours
function CheckColourType() {
    if (pickerCheckBox.checked()) {
        usePicker = true;
    }
    else {
        usePicker = false;
    }
}



// Function that changes the colour palette type
function ChangeColourPalette() {
    switch (paletteType.value()) {
        case 'Uniform':
            palette = 0;
            break;
        
        case 'Complementary':
            palette = 1;
            break;
        
        default:
            palette = 2;
            break;
    }
    CreatePlanet();
}



// Function that changes the colour palette type for trees
function ChangeTreePalette() {
    switch (treePaletteType.value()) {
        case 'Uniform':
            treePalette = 0;
            break;
        
        case 'Complementary':
            treePalette = 1;
            break;

        default:
            treePalette = 2;
            break;
    }
}



// Function that changes min/max values for tree heights
function ChangeTreeHeights() {
    minHeight = minHeightSlide.value();
    maxHeight = maxHeightSlide.value();
    CreateDetails();
}



// Function that changes min/max sizes for leaves
function ChangeLeafSizes() {
    leafMinSize = leafMinSizeSlide.value();
    leafMaxSize = leafMaxSizeSlide.value();
    CreateDetails();
}



// Function that changes the number of trees
function ChangeNumTrees() {
    numTrees = numTreesSlide.value();
    CreateDetails();
}



// Function that changes min/max atmosphere
function ChangeAtmosRange() {
    minR2 = minR2Slide.value();
    maxR2 = maxR2Slide.value();
    CreateAtmos();
}



// Function that changes atmosphere palette type
function ChangeAtmosPalette() {
    switch (atmosPaletteType.value()) {
        case 'Analogous':
            atmosPalette = 0;
            break;

        case 'Uniform':
            atmosPalette = 1;
            break;

        case 'Complementary':
            atmosPalette = 2;
            break;

        default:
            atmosPalette = 3;
            break;
    }
    CreateAtmos();
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}