let posX;
let posY;
let stepSize = 40;
let size = 20;
let ringSize = 40;
let values = []
let values1 = [-1,0,1];
let values2 = [-1];
let positions = [];
let exists = false;
let stepsX;
let stepsY;
speed = 1;

function setup() {
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  background(0);
  posX = 0 +stepSize;
  posY = 0 +stepSize;
  positions.push([posX,posY]);
  values = values1;
  ellipseMode(CENTER);
}

function draw() {
  noStroke();
  //background(0,0,0,3);

  for(i=0; i < speed; i++){

  stepsX = values[int(random(0, values.length))];
  stepsY = values[int(random(0, values.length))];

  console.log(stepsX,stepsY);

  stepsX*=stepSize;
  stepsY*=stepSize;
  
  posX= floor(posX+stepsX);
  posY= floor(posY+stepsY);


  //calculates grid based on window size and reset positions
  if(posX + stepsX > width){
    posX = 0 + stepSize
  }
  if(posX - stepsX < 0) {
    let cols = floor(width/stepSize);
    posX = 0 + (stepSize*(cols))
  } 
  if(posY + stepsY > height){
    posY = 0 + stepSize
  }
  if(posY - stepsY < 0) {
    let rows = floor(height/stepSize);
    posY = 0 + (stepSize*(rows))
  } 

  temp = [posX,posY];

  if(arrayAlreadyHasArray(positions, temp)[0]){ //on repeat positions
    exists = true;
    fill(255);
    // stroke(255);
    // strokeWeight(2);
    ellipse(posX,posY,ringSize-.25,ringSize-.25);
    fill(0);
    ellipse(posX,posY,ringSize-3,ringSize-3);
    fill(255);
    ellipse(posX,posY,size,size);
    positions = positions.splice(arrayAlreadyHasArray(positions, temp)[1]) // then remove at index
  }

  if(!exists){
      positions.push([posX,posY]); //adds to array
      
      fill(0);
      ellipse(posX,posY,ringSize+1,ringSize+1);

      fill(255);
      ellipse(posX,posY,size,size);
  }
  
  exists = false;
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    ringSize+=1;
  } else if (keyCode === DOWN_ARROW){
    ringSize-=1;
  } else if (keyCode === LEFT_ARROW){
    speed+=2;
  } else if (keyCode === RIGHT_ARROW){
    speed-=2;
  }else if(key == 1){
    frameRate(0);
  }else if(key == 2){
    frameRate(60);
  }
  return false; 
}

//courtesy of https://medium.com/better-programming/check-if-an-array-is-within-a-2d-array-using-javascript-c534d96cb269
function arrayAlreadyHasArray(arr, testArr){
  for(var i = 0; i<arr.length; i++){
      let checker = []
      for(var j = 0; j<arr[i].length; j++){
          if(arr[i][j] === testArr[j]){
              checker.push(true)
          } else {
              checker.push(false)
          }
      }
      if (checker.every(check => check === true)){
          return [true, i] //returns array with whether it exists and its index
      }
  }
  return false
}

