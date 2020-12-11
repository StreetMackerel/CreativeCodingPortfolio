shapesCount = 2000; //determines speed of population

dists = [];

function setup() {
  // width = window.innerWidth;
  // height = window.innerHeight;
  width = innerWidth;
  height = innerHeight;
  createCanvas(width, height); //fullscreen
  background(0);
  stroke(255);
  //noStroke(0);
  shapes = [];

  strokeWeight(1);
  noFill();

}

function draw() {
  background(0);

  for(i = 0; i< shapesCount; i++){ //create x new shapes per frame
  createShape();
  }

  for (let s of shapes) { //forEach but allows break
    if (s.expanding) {
      if (s.Edges()) { // stop if touching any edge
        s.expanding = false;
      } else {
        for (let o of shapes) { // nest for each
          if (s != o) { // not same object
            let d = dist(s.x, s.y, o.x, o.y); //distance between centres
            if (d < s.r + o.r) {
              s.expanding = false
              break;
            }
          }
        }
      }
    }

    stroke(s.color); // manages being unable to assign fill on Class
    if(s.special2){
      noStroke();
      fill(150,10,10);
    } else {
      noFill();
    }
    s.Animate();
    s.Expand();

  }
  //noLoop();
}

function createShape() {

  let r = random(100,400); // large circle dimensions
  let x = random(width);
  let y = random(height);
  let c = 255;

  //this is for density in corners
  // let d2 = dist(x, y, 0, 0);
  // let d3 = dist(x, y, width, height);
  // let d4 = dist(x, y, 0, height);
  // let d5 = dist(x, y, width, 0);
  // let d6 = dist(x, y, 0, height/2);
  // let d7 = dist(x, y, width/2, 0);
  // let d8 = dist(x, y, width/2, height);
  // let d9 = dist(x, y, width, height/2);
  //
  // r = map(min(d2,d3,d4,d5,d6,d7,d8,d9), 0, width, 0.01, 50);

  dists = []

  let valid = true;
  if (shapes.length > 0) {
    if(shapes.length>10){ //number of large circles
      r = random(5,50); // minimum and maximum range of size for most circles
      }
    // this is for density close to large shapes
    //for (let o of shapes) {
    //  if(o.special && o.x!=x && o.y!=y){ //gets distances between this and large circles
    //    dists.push(dist(x, y, o.x, o.y));
    //  }
    //}
    //r = map(min(dists), 0, width , 10, 120); //map size and color to the smallest distance
    //c = abs(map(r, 1, 40 , -255, -1));
    //c = abs(map(r, 1, 80 , 0, 1));


    for (let s of shapes) {
      let d = dist(x, y, s.x, s.y);
      if (d < s.r + r) { //dont spawn on overlap
        valid = false;
      }
    }
    if (valid) {
      shapes.push(new Shape(x, y, r, c)); // inserts of position is valid
    }
  } else {
    shapes.push(new Shape(x, y, r, c)); // initial shape
    console.log("initial shape");
  }
}
