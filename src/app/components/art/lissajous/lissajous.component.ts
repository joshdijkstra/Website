import { Component, OnDestroy, OnInit } from '@angular/core';
import * as p5 from 'p5';

let scl = 500;
let redu = 10;

@Component({
  selector: 'dijkstra-web-lissajous',
  templateUrl: './lissajous.component.html',
  styleUrls: ['./lissajous.component.css'],
})
export class LissajousComponent implements OnInit, OnDestroy {
  aSlider: any;
  bSlider: any;
  dSlider: any;
  a: any;
  b: any;
  d: any;
  x: any;
  sx: any;
  y: any;
  sy: any;
  history: { x: number; y: number }[] = [];
  canvas: p5 | undefined;

  ngOnDestroy() {
    this.canvas?.remove();
  }
  ngOnInit() {
    const sketch = (s: any) => {
      s.setup = () => {
        const canvas2 = s.createCanvas(s.windowWidth, s.windowHeight);
        canvas2.parent('lissa-holder');
        s.frameRate(1000);
        this.aSlider = s.createSlider(0, 6, 1, 1);
        this.aSlider.position(20, 100);
        this.bSlider = s.createSlider(0, 6, 2, 1);
        this.bSlider.position(20, 150);
        this.dSlider = s.createSlider(0, 5, 0, 1);
        this.dSlider.position(20, 200);
        this.x = s.windowWidth / 2;
        this.y = s.windowHeight / 2;
        this.sx = s.windowWidth / 2;
        this.sy = s.windowHeight / 2;
        this.history = [];
      };

      s.draw = () => {
        s.background(0);
        this.a = this.aSlider.value();
        this.b = this.bSlider.value();
        this.d = this.dSlider.value() * (Math.PI / 4);
        // this.d = Math.sin((s.frameCount * Math.PI) / 5000);
        this.x =
          this.sx + scl * Math.sin(this.a * (s.frameCount / redu) + this.d);
        this.y = this.sy + scl * Math.sin(this.b * (s.frameCount / redu));
        this.history.push(new s.createVector(this.x, this.y));
        if (this.history.length > 100) {
          this.history.splice(0, 1);
        }
        s.stroke('rgba(0,255,0,1)'); // Change the color
        s.strokeWeight(5);
        s.noFill();
        s.beginShape();
        for (let i = 0; i < this.history.length; i++) {
          // stroke('rgba(0,255,0,1)');
          // point(this.history[i].x,this.history[i].y)
          s.curveVertex(this.history[i].x, this.history[i].y);
        }
        s.endShape();
        s.noStroke();
        s.fill('rgba(255,255,255,1)');

        let texta = 'a : ' + this.a;
        let textb = 'b : ' + this.b;
        let textd = 'delta : ' + this.dSlider.value() + 'π/4';
        s.text(texta, this.aSlider.x * 2 + this.aSlider.width, 50);
        s.text(textb, this.bSlider.x * 2 + this.bSlider.width, 100);
        s.text(textd, this.dSlider.x * 2 + this.dSlider.width, 150);
      };
    };

    this.canvas = new p5(sketch);
  }
}
