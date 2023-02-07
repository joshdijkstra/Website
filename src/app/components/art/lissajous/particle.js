let scl = 100;
let redu = 10;

export class Particle {
  constructor(x, y) {
    this.a = 2;
    this.b = 2;
    this.d = Math.PI / 2;
    this.x = x;
    this.y = y;
    this.sx = x;
    this.sy = y;
    this.history = [];
  }

  update(val1, val2, val3) {
    this.a = val1;
    this.b = val2;
    this.d = val3;
    this.x = this.sx + scl * Math.sin(this.a * (frameCount / redu) + this.d);
    this.y = this.sy + scl * Math.sin(this.b * (frameCount / redu));
    this.history.push(new createVector(this.x, this.y));
    if (this.history.length > 100) {
      this.history.splice(0, 1);
    }
  }

  show() {
    stroke("rgba(0,255,0,1)"); // Change the color
    strokeWeight(5);
    noFill();
    beginShape();
    for (let i = 0; i < this.history.length; i++) {
      // stroke('rgba(0,255,0,1)');
      // point(this.history[i].x,this.history[i].y)
      curveVertex(this.history[i].x, this.history[i].y);
    }
    endShape();
  }
}
