import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'dijkstra-web-coding-page',
  templateUrl: './coding-page.component.html',
  styleUrls: ['./coding-page.component.css'],
})
export class CodingPageComponent {
  constructor(public router: Router){}

  public navigateTo = (url : string) => {
    this.router.navigate([url], { replaceUrl: true });

  } 
}
