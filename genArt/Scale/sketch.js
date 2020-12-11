numSquares = 100
let squareSize;
offSwitch = true;
count = 0;
shapes = [];

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  background(255);
  colorMode(HSB, 360, 100, 100);
  squareSize = 200;
  noStroke();
}

function draw() {
  count = 0;

  stepSizeX = squareSize / 2;
  stepSizeY = squareSize / 2 ;

  background(0, 0, 0, 100, 20);


  for (let y = 0; y < height; y += stepSizeY) {
    for (let x = 0; x < width; x += stepSizeX) {

      push();
      tx = x;
      ty = y;
        
      /*rectMode(CENTER);
      ellipseMode(CORNER);
      tx = x + squareSize / 2;
      ty = y + squareSize / 2;*/
        
      translate(tx, ty);
      let i = atan2(mouseX - tx, mouseY - ty);
        
        
        
        
        
//circle around mousePos
      shapes[count] = new Shape(map(Math.hypot(mouseX - tx, mouseY - ty),0, window.innerWidth, 0,200), map(Math.hypot(mouseX - tx, mouseY - ty), 0, window.innerHeight, 0,200), i, 360, count);
        
//whole screen       
      //shapes[count] = new Shape(map(dist(0, 0, mouseX, 0),0, width, 0,squareSize), map(dist(0, 0, 0, mouseY), 0, height, 0,squareSize), i, 360, count);
                                
      
      shapes[count].Animate();
      count++;
      pop();
    }
  }
}

function coinToss() {  
    x = (floor(random() * 2));
    if(x){
        console.log("heads");
    }else{
        console.log("tails");
    }
};