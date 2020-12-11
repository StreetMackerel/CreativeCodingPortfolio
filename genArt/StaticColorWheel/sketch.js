function setup(){
    createCanvas(500,500);
    background(0,0,255);
    noStroke();
    colorMode(HSB, 360, 50, 50); // colour mode change



}

function draw(){

  let numOfSegments = 180;
  let stepAngle = 360/numOfSegments;
  let r = 150;

  beginShape(TRIANGLE_FAN); // creates a new shape accept a series of vertexes
  vertex(250,250);
  angleMode(DEGREES);
  for(let i=0; i <= 360; i+= stepAngle){
    let vx = r*cos(i) + 250;
    let vy = r*sin(i) + 250;
    fill(i, 100, 100);
    vertex(vx,vy);
  }
  endShape(CLOSE); // closes the shape up
}

// function keyPressed(){ //saves an image of current canvas composition
//   if(key == 's' || key == 'S'){
//     saveCanvas(gd.timestamp(),'png');
//   }
// }
