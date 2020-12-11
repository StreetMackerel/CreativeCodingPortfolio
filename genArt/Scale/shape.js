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
    fill(this.color, 75, 75);
    ellipse(0, 0, this.width, this.height);
  //}
}
}
