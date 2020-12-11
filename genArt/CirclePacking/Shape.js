class Shape {

  constructor(x, y, r, color) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.color = color;
    this.expanding = true;
    this.special = false;
    this.special2 = false;

  }

  Expand(){
    if(this.expanding){
    this.r=this.r+1;
   }
  }

  Edges(){
    return (this.x+this.r > width || this.x - this.r < 0 || this.y+this.r > height || this.y - this.r < 0);
  }

  Animate() {
    if(this.r<100 && this.r>5.2){ //standard circles
      strokeWeight(2);
      ellipse(this.x,this.y,this.r*2,this.r*2);
    } else if(this.r>100){ // large circles
      this.special = true;
      strokeWeight(3);
      ellipse(this.x,this.y,this.r/2,this.r/2);
      strokeWeight(5);
      stroke(150,10,10);
      ellipse(this.x,this.y,this.r/4,this.r/4);
    } else { // small coloured circles
      this.special2 = true;
      strokeWeight(1);
      stroke(150,10,10);
      ellipse(this.x,this.y,this.r*2,this.r*2);
    }

  }
}
