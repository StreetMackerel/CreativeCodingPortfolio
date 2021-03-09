let vertices = [];
let vertObjects = [];
let spline_size = 150;

function setup() {
  createCanvas(vmin(100), vmin(100));
  reset();


  function vmin(viewportPercent) { //calculates viewport size percentage
    viewportPercent = viewportPercent / 100
    var viewportMinSize = Math.min(window.innerWidth, window.innerHeight);
    return viewportPercent * viewportMinSize;
  }
}

function mousePressed() {
  reset();
}

function reset() {
  background(0,0,0,10);
  noFill();
  stroke(255);
  strokeWeight(.5);
  spline_size = width/2-width*0.1;
  resetSpline(spline_size);
}

function resetSpline(size) {
  vertices = [];
  for (var i = 0; i <= TWO_PI; i+=0.1) {
    vertices.push({x: size * sin(i), y: size * cos(i)});  
  }
}

function draw() {

  background(0,0,0,3);
  translate(width/2, height/2);
  vertObjects = [];
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    var range = 0.5;

    //semi noise
    var offsetX = map(random([-1,1]), -1, 1, -range, range);
    var offsetY = map(random([-1,1]), -1, 1, -range, range);

    vertices[i].x += offsetX;
    vertices[i].y += offsetY;

    //to replace with object
    curveVertex(vertices[i].x, vertices[i].y);

      let s = new Shape(createVector(vertices[i].x, vertices[i].y))
      vertObjects.push(s);
  }
  endShape(CLOSE);

  if (frameCount % 200 === 0) {
    spline_size -= 10;
   // resetSpline(spline_size);
  }



}
