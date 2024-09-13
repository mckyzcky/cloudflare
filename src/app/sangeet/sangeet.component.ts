import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sangeet',
  standalone: true,
  imports: [],
  templateUrl: './sangeet.component.html',
  styleUrl: './sangeet.component.css',
})
export class SangeetComponent {
  constructor(private router: Router) {}

  navigate(): void {
    this.router.navigate(['mcky/zcky']);
  }
}
