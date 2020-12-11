class Shape {
  constructor(width, height, rotation, color, key) {
    this.height = height;
    this.width = width;
    this.rotation = rotation;
    this.color = color;
    this.key = key;
  }

  Animate() {
  //for (let i = 0; i < 2; i ++) {
    stroke(this.color, 75, 75);
    ellipse(10, 10, this.width, this.height);
    stroke(Math.abs(this.color+180 %360), 75, 75);
    ellipse(10, 10, this.width-(32), this.height-(32));
  //}
}
}
