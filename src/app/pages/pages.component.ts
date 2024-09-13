import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface index {
  [key: string]: string[];
}

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css',
})
export class PagesComponent {
  indices: index = {
    'Tabs:tabs': ['Wedding Medley:weddingmedley', 'Upbeat Medley:upbeatmedley'],
    'System Info:systeminfo': [],
    'Wedding:wedding': [],
    'Tech Playground:tech': [],
    'Photo Album:album': [],
    'Arcade:arcade': [],
    'You vs AI:ai': [],
  };
  curindices: index = JSON.parse(JSON.stringify(this.indices));

  colors: string[] = [
    '#FFAF87',
    '#FF8E72',
    '#6FADEC',
    '#4CE0B3',
    '#F1FCB0',
    '#9D6B9E',
    '#E18EDD',
  ];

  lColors: string[] = [
    '#FFBB99',
    '#FF9D85',
    '#81B8EF',
    '#63E3BD',
    '#F8FED8',
    '#A677A6',
    '#E59EE2',
  ];

  hover: boolean[] = [];
  heading: string = 'index.html';

  constructor(private router: Router) {}

  onMouseOver(ind: number) {
    this.hover[ind] = true;
  }
  onMouseOut(ind: number) {
    this.hover[ind] = false;
  }

  ngOnInit(): void {
    for (let _ in this.indices) {
      this.hover.push(false);
    }
  }

  navigate(route: string): void {
    if (route.indexOf(':') === -1) {
      window.location.reload();
    } else {
      if (this.curindices[route].length === 0) {
        if (this.heading === 'index.html') {
          this.router.navigate([route.split(':')[1]]);
        } else {
          this.router.navigate([
            this.heading.split(':')[1] + '/' + route.split(':')[1],
          ]);
        }
      } else {
        this.curindices = {};
        for (let i of this.indices[route]) {
          this.curindices[i] = [];
        }
        this.heading = route;
      }
    }
  }
}
