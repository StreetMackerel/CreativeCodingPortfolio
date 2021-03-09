let r = 50;
circles = [];
let moving = false;
let mover;
let target;
let velocity = 25; // step size must be smaller than half of min radius
let dVector;
let mag;
let col = 360;
let colFloor;
let colCeil;
let step = 15;

function setup() {
  angleMode(DEGREES);
  noStroke();
  width = window.innerWidth;
  height = window.innerHeight;
  createCanvas(width, height);
  colorMode(HSB, 360, 100, 100);
  colFloor = random(1,359);
  colCeil = (colFloor + 180) % 360; // compliment of random
  circles.push(new Circle(createVector(width/2,height/2),60, colFloor+1, 100)); // origin in center

  for(let i = width+(step*50); i >= height; i-=step){ // background colours
    fill(map(-i, -(width+(step*50)), -height , colFloor , colCeil), 70,map(i, (width+(step*4)*2),0, 5, 100)); // map using colours and brightness
    ellipse(width/2,height/2,i,i); 
  }
}

function draw() {
  r = map(-circles.length, -150, 1, 15,60); // descends radius with each new circle
  if(r<15){r=15;} //size floor of 15 ( lower causes issues with speed )

  
  fill(0);
  ellipse(width/2,height/2,height+25,height+25); //center circle
  
  noStroke();

  for (let c of circles) {  //visualizes on canvas
    fill(c.color, 70, c.bri);
    c.Render();
  }

  if(moving == false){ //controls whether to create new or move current
  let result = newCircle(); //returns array with new circle and its closest

    if(result !=null){
      let x = circles.push(new Circle(result[0],r,col, col)) // new
      mover = circles[circles.length-1];
      target = result[1];
    }
  
  moving = true;

  } else {
    dVector = p5.Vector.sub(mover.vector,target.vector);
    mag = dVector.mag();
    dVector.normalize();
    dVector.mult(velocity);
    mover.vector.sub(dVector);

    if(dist(mover.vector.x, mover.vector.y, target.vector.x, target.vector.y)+1 <= mover.r/2+target.r/2){ //dist more accurate than mag here. calculation time?
      dVector.setMag(mover.r/2+target.r/2);
      mover.vector = p5.Vector.add(target.vector, dVector); // for perfect edges
      mover.color = map(dist(mover.vector.x,mover.vector.y, width/2,height/2),0,height/2,colFloor,colCeil); // map colour to distance from center
      mover.bri = map(mover.r,15, 50,20,100);
      moving = false;
    }
  }

}

function newCircle(){
  let pt_angle = Math.random() * 2 * Math.PI; // for area in circle
  let pt_radius_sq = Math.random() * height/2 * height/2;
  let pt_x = Math.sqrt(pt_radius_sq) * Math.cos(pt_angle);
  let pt_y = Math.sqrt(pt_radius_sq) * Math.sin(pt_angle);
  let t = createVector(width/2+pt_x,height/2+pt_y);

  //let t = createVector(random(r, width-r),random(r ,height-r)); // area in canvas

  let closest = width; // initial size must be larger than max distance possible
  let i = 0; // loop iteration
  let index = 0; // holds index of closest circle
  let valid = true; // whether the circle is inside another

  for (let c of circles) { // sort for shortest distance
    let d = dist(t.x, t.y, c.vector.x, c.vector.y);
    
    if (d < c.r+r) { //dont spawn on overlap
      valid = false;
    }
    else if (d < closest) {
      closest = d;
      index = i;
    }
    i++;
  }

  if (valid) { // return closest and new position
    let arr = [t,circles[index]]
    return arr;
  }
   else {
    return null; // do nothing if invalid
  }

}

