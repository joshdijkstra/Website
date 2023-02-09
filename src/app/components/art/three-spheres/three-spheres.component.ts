import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import * as p5 from 'p5';

@Component({
  selector: 'dijkstra-web-three-spheres',
  templateUrl: './three-spheres.component.html',
  styleUrls: ['./three-spheres.component.css'],
})
export class ThreeSpheresomponent implements OnInit, OnDestroy {
  @Input() speed = 1400;
  @Input() idName = 'sphere-holder';
  sw = 2;
  strokeColor = 0;
  canvas: any;

  ngOnDestroy() {
    this.canvas?.remove();
  }

  ngOnInit() {
    const sketch = (s: any) => {
      s.setup = () => {
        const canvas2 = s.createCanvas(s.windowWidth, s.windowHeight, s.WEBGL);
        canvas2.style('display', 'block');
        canvas2.parent('contact');
      };

      s.windowResized = () => {
        s.resizeCanvas(s.windowWidth, s.windowHeight);
      };

      s.draw = () => {
        s.background(0);
        s.camera(
          s.width * 0.33,
          s.height / 2,
          s.height / 2 / s.tan(s.PI / 2),
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
        s.rotateX((s.TWO_PI * s.frameCount) / this.speed + 100);
        s.rotateZ((s.TWO_PI * s.frameCount) / this.speed);
        s.rotateY((s.TWO_PI * s.frameCount) / this.speed - 100);

        s.sphere(3100);
        s.sphere(1200);

        s.push();
        s.pop();

        s.rotateX((s.TWO_PI * s.frameCount) / this.speed + 100);
        s.rotateZ((s.TWO_PI * s.frameCount) / this.speed);
        s.rotateY((s.TWO_PI * s.frameCount) / this.speed - 100);

        s.sphere(2200);
      };
    };

    this.canvas = new p5(sketch);
  }
}
