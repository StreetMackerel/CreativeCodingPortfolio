class Shape {
  constructor(width, height, rotation, color, key) {
    this.height = height;
    this.width = width;
    this.rotation = rotation;
    this.color = color;
    this.key = key;
  }

  Animate() {
    stroke(this.color, 80, 80);
    rect(0, 0, this.width, this.height);
  }
}
