class Circle {
  constructor(_vector, _r, _c, _b){
    this.vector = _vector
    this.r = _r
    this.color = _c;
    this.bri = _b
  }


  Render() {
    ellipse(this.vector.x,this.vector.y,this.r,this.r)
  }
}
