import { TagContentType } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-pagenotfound',
  templateUrl: './pagenotfound.component.html',
  styleUrls: ['./pagenotfound.component.css'],
})
export class PagenotfoundComponent implements OnInit {
  canvas: any;
  sw = 2;
  c = [];
  strokeColor = 0;

  constructor() {}

  ngOnInit() {
    // this sketch was modified from the original
    // https://editor.p5js.org/Janglee123/sketches/HJ2RnrQzN
    const sketch = (s) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        // creating a reference to the div here positions it so you can put things above and below
        // where the sketch is displayed
        canvas2.parent('sketch-holder');
      };

      s.draw = () => {
        s.background(0);
        s.camera(
          s.mouseX,
          s.height / 2,
          s.height / 2 / s.tan(s.PI / 6),
          s.mouseX,
          s.height / 2,
          0,
          0,
          1,
          0
        );
        s.translate(s.width / 2, s.height / 2, -100);
        s.stroke(255);
        s.noFill();

        s.translate(240, 0, 0);
        s.push();
        s.rotateZ(s.frameCount * 0.01);
        s.rotateX(s.frameCount * 0.01);
        s.rotateY(s.frameCount * 0.01);
        s.torus(240, 70, 20);
        s.pop();
        s.rotateX((s.TWO_PI * s.frameCount) / 500);
        s.rotateX((s.TWO_PI * s.mouseX) / 400);
        s.rotateX((s.TWO_PI * s.frameCount) / 300);

        s.sphere(100);
        s.sphere(200);
      };

      s.mouseReleased = () => {
        // modulo math forces the color to swap through the array provided
        this.strokeColor = (this.strokeColor + 1) % this.c.length;
        s.stroke(this.c[this.strokeColor]);
        console.log(`color is now ${this.c[this.strokeColor]}`);
      };

      s.keyPressed = () => {
        if (s.key === 'c') {
          window.location.reload();
        }
      };
    };

    this.canvas = new p5(sketch);
  }
}
