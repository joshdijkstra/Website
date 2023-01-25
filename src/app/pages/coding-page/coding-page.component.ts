import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'app-coding-page',
  templateUrl: './coding-page.component.html',
  styleUrls: ['./coding-page.component.css'],
})
export class CodingPageComponent implements OnInit {
  constructor() {}
  canvas: any;
  sw = 2;
  c = [];
  strokeColor = 0;

  ngOnInit(): void {
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
          s.width * 0.33,
          s.height / 2,
          s.height / 2 / s.tan(s.PI / 6),
          s.width * 0.33,
          s.height / 2,
          0,
          0,
          1,
          0
        );
        s.translate(s.width / 2, s.height / 2, -100);
        s.stroke(150);
        s.noFill();

        s.translate(240, 0, 0);
        s.push();
        s.pop();
        s.rotateX((s.TWO_PI * s.frameCount) / 1500);
        s.rotateZ((s.TWO_PI * s.frameCount) / 1400);
        s.rotateY((s.TWO_PI * s.frameCount) / 1300);

        s.sphere(3100);
        s.sphere(1200);
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
