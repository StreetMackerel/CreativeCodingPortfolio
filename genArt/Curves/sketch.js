let angle;
let xPos;
let yPos;
let numOfSegments = 10;
let step = 1;
let AngleCount = 3;
let points = []
let radius = 100;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  background(0);

  angle = radians(360/numOfSegments);

  for (let i = 0; i < numOfSegments; i++) {

    xPos = cos(angle*i)*radius;
    yPos = sin(angle*i)*radius;

    points.push(createVector(xPos,yPos));
  }
}

function draw() {
  background(0);
  
  push();
  translate(width/2, height/2);

  for (let i = 0; i < points.length; i++) {

    fill(255,0,0);
    ellipse(points[i].x , points[i].y, 10, 10);

  }

  for (let i = 0; i < points.length - 1; i++) {

    stroke(255);
    //line(points[i].x,points[i].y, points[i + 1].x, points[i + 1].y);

  }

  beginShape();
  curveVertex(points[points.length - 1].x, points[points.length - 1].y);
  for (let i = 0; i < points.length; i++) {
    noFill();
    stroke(255);
    curveVertex(points[i].x,points[i].y);
  }
  curveVertex(points[0].x,points[0].y);
  curveVertex(points[1].x,points[1].y);
  endShape();

  pop();
  
}
