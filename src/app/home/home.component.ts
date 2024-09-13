import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  private canvas!: HTMLCanvasElement;
  private context!: CanvasRenderingContext2D;
  private fontSize = 16;
  private rainDrops: number[] = [];
  private animationInterval: any;

  private katakana =
    'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  private latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private nums = '0123456789';
  private alphabet = this.katakana + this.latin + this.nums;

  constructor() {}

  ngOnInit(): void {
    this.setupCanvas();
    this.startAnimation();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.setupCanvas();
  }

  private setupCanvas(): void {
    this.canvas = document.getElementById('Matrix') as HTMLCanvasElement;
    this.context = this.canvas.getContext('2d')!;

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    const columns = this.canvas.width / this.fontSize;
    this.rainDrops = Array(Math.floor(columns)).fill(1);
  }

  private draw(): void {
    this.context.fillStyle = 'rgba(0, 0, 0, 0.05)';
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.context.fillStyle = '#5D3FD3';
    this.context.font = this.fontSize + 'px monospace';

    for (let i = 0; i < this.rainDrops.length; i++) {
      const text = this.alphabet.charAt(
        Math.floor(Math.random() * this.alphabet.length)
      );
      this.context.fillText(
        text,
        i * this.fontSize,
        this.rainDrops[i] * this.fontSize
      );

      if (
        this.rainDrops[i] * this.fontSize > this.canvas.height &&
        Math.random() > 0.975
      ) {
        this.rainDrops[i] = 0;
      }
      this.rainDrops[i]++;
    }
  }

  private startAnimation(): void {
    this.animationInterval = setInterval(() => this.draw(), 30);
  }
}
