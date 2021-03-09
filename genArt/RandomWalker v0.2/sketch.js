let angle = 15;
let xPos;
let yPos;

let step = 1;
let AngleCount = 3;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  background(0);
  xPos = width/2;
  yPos = height/2;
}

function draw() {

  for (let x = 0; x <5; x++) {
    stroke(255);
    strokeWeight(10);
    point(xPos,yPos);

    xPos += sin(angle)*step;
    yPos += cos(angle)*step;

    if(xPos>width || xPos <0 || yPos>height || yPos<0){
      angle = bounce(xPos,yPos);
    }
  }

  
}


function bounce(x, y){

  step = 90/AngleCount;
  value = 90/(AngleCount*2); 
  angles = [];

  for (let i = value; i<=90; i += step){
    angles.push(value);
    angles.push(value*-1);
    value+=step;
  }

  let newAngle = angles[int(random(0,angles.length))]

  console.log(newAngle);
  
  if(y<0){
    return newAngle;
  }
  
  else if(y>height){
    return newAngle + 180;
  }

  else if(x<0){
    return newAngle + 270;
  }
  
  else if(x>width){
    return newAngle + 90;
  }
}

