class Shape {
  constructor(width, height, rotation, color, key) {
    this.height = height;
    this.width = width;
    this.rotation = rotation;
    this.color = color;
    this.key = key;
  }

  Animate() {
      noFill();
  //for (let i = 0; i < 2; i ++) {
    stroke(this.color, 75, 75);
    bezier(0, 0, mouseX, mouseY, 20, 20, mouseX, mouseY);
  //}
}
}
