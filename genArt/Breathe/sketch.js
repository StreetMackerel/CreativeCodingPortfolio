


var offset = 0;
var strum = 1;

function setup() { 
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
} 

function draw() { 
  
  background(0);
  noStroke();
  fill(255);

  for(var x = 0; x < width; x++){

    var angle = offset + x * 0.01;

    var y = map(sin(angle), -strum, strum, 0+height/4, height+-height/4);
    if(x == int(width/2)){
      ellipse(x, y, 50,50);
    }
    ellipse(x, y, 6, 6);
  }

  for(var x = 0; x < width; x++){

    var angle = offset + x * 1;

    var y = map(sin(-angle), -strum, strum, 0+height/4, height+-height/4);
    if(x == int(width/2)){
      ellipse(x, y, 50,50);
    }
    ellipse(x, y, 6, 6);
  }
  
  offset += 0.025;
  
}

