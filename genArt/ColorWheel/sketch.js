let ir = 20; //inner and outer radii
let or = 70;
let irx = 90;
let orx = 140;
let iry = 160;
let ory = 210;
let irz = 230;
let orz = 250;

let colorOne;
let colorTwo;
let colorThree;
let colorFour;

let x;
let y; //canvas size

let angle = 0;
let mode = "Complimentary"; // for html display
let analagous = false; //for button controls
let complimentary = true;

let hue = 100; // holds mouse position as a value between 0,360;
let sat = 75;
let bri = 100;

let compliment; //complimentary color

let analogx; //analagous colours
let analogy;

let tetX; // tetradic colours
let tetY;
let tetZ;


let numPoints;
let stepAngle;

let start = 0; // to animate noise
let inc = 0.06;
let zoff = 10;

let i = 0.1;

function setup() {
  createCanvas(600, 500);
  background(0, 0, 255);
  noStroke();
  colorMode(HSB, 360, 100, 100, 100); // colour mode change

  x = 250;
  y = 250;

  colorOne = color(hue, sat, bri);
  colorTwo = color(compliment, sat, bri);
  colorThree = color(analogx, sat, bri);
  colorFour = color(analogy, sat, bri);
}

function draw() {
  background(0, 0, 255);

  numPoints = 60; // roundness of triangle strips
  stepAngle = 360 / numPoints; // control for triangle strips

  drawColourStrip(); // colour picker

  ringOne(); // rings
  ringTwo();
  ringThree();
  ringFour();

  updateMode(); // checks for display mode change

  if (mode == "art") { // art mode
    ProcedurallyGenerateArt();
  }
}

function ringOne() {
  beginShape(TRIANGLE_STRIP); // center ring
  angleMode(DEGREES);
  for (let i = 0; i <= numPoints; i++) { //center ring
    let vx = x + cos(angle) * or;
    let vy = y + sin(angle) * or;
    angle += stepAngle;
    vertex(vx, vy);
    vx = x + cos(angle) * ir;
    vy = y + sin(angle) * ir;
    vertex(vx, vy);
    angle += stepAngle;
    fill(colorOne);
  }
  endShape(CLOSE);
}

function ringTwo() {
  beginShape(TRIANGLE_STRIP); // second from center ring
  angleMode(DEGREES);
  for (let i = 0; i <= numPoints; i++) {
    let vx = x + cos(angle) * orx;
    let vy = y + sin(angle) * orx;
    angle += stepAngle;
    vertex(vx, vy);
    vx = x + cos(angle) * irx;
    vy = y + sin(angle) * irx;
    vertex(vx, vy);
    angle += stepAngle;
    if (analagous) { // controls different colours depending on mode
      colorTwo = color(analogx, 75, 100);
    } else if (complimentary) {
      colorTwo = color(compliment, 75, 100);
    } else {
      colorTwo = color(tetX, 75, 100);
    }
    fill(colorTwo);

  }
  endShape(CLOSE);
}

function ringThree() {
  beginShape(TRIANGLE_STRIP); // 3rd from center ring
  angleMode(DEGREES);
  for (let i = 0; i <= numPoints; i++) {
    let vx = x + cos(angle) * ory;
    let vy = y + sin(angle) * ory;
    angle += stepAngle;
    vertex(vx, vy);
    vx = x + cos(angle) * iry;
    vy = y + sin(angle) * iry;
    vertex(vx, vy);
    angle += stepAngle;
    if (analagous) {
      colorThree = color(analogy, 75, 100);
    } else if (complimentary) {
      colorThree = color(0, 0, 100);
    } else {
      colorThree = color(tetY, 75, 100);
    }
    fill(colorThree);
  }
  endShape(CLOSE);
}

function ringFour() {
  beginShape(TRIANGLE_STRIP); // outer ring
  angleMode(DEGREES);
  for (let i = 0; i <= numPoints; i++) {
    let vx = x + cos(angle) * orz;
    let vy = y + sin(angle) * orz;
    angle += stepAngle;
    vertex(vx, vy);
    vx = x + cos(angle) * irz;
    vy = y + sin(angle) * irz;
    vertex(vx, vy);
    angle += stepAngle;
    if (analagous) {
      colorFour = color(0, 0, 100);
    } else if (complimentary) {
      colorFour = color(0, 0, 100);
    } else {
      colorFour = color(tetZ, 75, 100);
    }
    fill(colorFour);
  }
  endShape(CLOSE);
}

function SwitchComp() { //html button functions
  analagous = false;
  complimentary = true;
  tetradic = false;
}

function SwitchAnalagous() {
  analagous = true;
  complimentary = false;
  tetradic = false;
}

function SwitchTet() {
  analagous = false;
  complimentary = false;
  tetradic = true;
}

function SwitchArt() {
  mode = "art"
}

function mouseClicked() { //changes held colour when the colour strip is clicked
  if (mouseX >= 550) {
    hue = int(map(mouseY, 0, height, 0, 360)) % 360; // holds mouse position as a value between 0,360;

    compliment = (hue + 180) % 360; //complimentary color

    analogx = (hue + 30) % 360; //analagous colours
    analogy = (hue - 30) % 360;

    tetX = (hue + 90) % 360; // tetradic colours
    tetY = (hue + 180) % 360;
    tetZ = (hue + 270) % 360;

    colorOne = color(hue, sat, bri);
  } else {
    clicked = false;
  }
}

function updateMode() { // changes colour mode

  if (mode != "art") {
    if (analagous) {
      mode = "Colour Mode: Analagous";
    } else if (complimentary) {
      mode = "Colour Mode: Complimentary";
    } else {
      mode = "Colour Mode: Tetradic";
    }
  }
  document.getElementById("mode").innerHTML = mode;
}

function drawColourStrip() {
  for (let i = 0; i <= 360; i++) { //draws strip colour picker
    noStroke();

    startColor = color(0, 75, 100);
    endColor = color(359, 75, 100);

    fill(lerpColor(startColor, endColor, i / 360));
    // rect(100 + i, 100, 50, 50);
    //
    // fill (i, 75, 100);
    rect(550, (height / 360) * i, 50, height / 360);
    //fill(lerpColor(midColor, endColor, i/360));
    //rect(550, ((height/2) / 360) * i, 50, (height/2)/ 360);
  }
}
let n;

function ProcedurallyGenerateArt() { // expermient to create random art using noise

  //noiseDetail(random(4,24),random(0.1,0.99));

  noiseDetail(20);

  let pixelDensity = 4;//controls size of each rectangle on screen

  let yoff = 0;

  for (let y = 0; y < height; y += pixelDensity) { //loop to go through each pixel
    let xoff = start;
    for (let x = 0; x < 550; x += pixelDensity) {

      n = noise(xoff, yoff, zoff);

      colourVariety = map(n, 0, 1, 30, 100);
      upperGapSize = map(n, 0, 1, 0.6, 0.75); // controls the rate at which the colours blend into one another
      lowerGapSize = map(n, 0, 1, 0.25, 0.4);

      colourVariety = random(30, 100); // randomly selects intensity of colour variety in each zone

      let col1 = color(map(n, 0, 1, hue - colourVariety, hue + colourVariety), sat, bri);
      let col2 = color(map(n, 0, 1, compliment - colourVariety, compliment + colourVariety), sat, bri);


      if (n < upperGapSize && n > lowerGapSize) { // logic gate loop determines when each colour should begin lerping towards one another
        fill(lerpColor(col1, col2, map(n, 0.45, 0.55, 0, 1)));
        rect(x, y, pixelDensity, pixelDensity);
      } else if (n < lowerGapSize) {
        fill(col1);
        rect(x, y, pixelDensity, pixelDensity);
      } else {
        fill(col2);
        rect(x, y, pixelDensity, pixelDensity);
      }


      //let n2 = map(n, 0, 360, hue, compliment); //midpoint colour noise

      //fill(lerpColor(colorOne,colorTwo,xoff*yoff)); //gradient



      xoff += inc;
    }
    yoff += inc;
    zoff += 0.0006;
  }

start +=inc;
  //noLoop();

}
