import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import weddingMedley from '../../assets/data/wedding.json';
import upbeatMedley from '../../assets/data/upbeat.json';
import { ActivatedRoute, Router } from '@angular/router';

interface Song {
  chords: string;
  lyrics: string;
}

interface SongCollection {
  [key: string]: Song[];
}

@Component({
  selector: 'app-tabs',
  standalone: true,
  imports: [CommonModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.css',
})
export class TabsComponent implements OnInit, OnDestroy {
  songs: SongCollection | undefined = undefined;
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.resetVariables();
      this.medley = params.get('medley') || '';
      if (this.medley === 'weddingmedley') {
        this.songs = weddingMedley;
      } else if (this.medley === 'upbeatmedley') {
        this.songs = upbeatMedley;
      } else {
        this.router.navigate(['mcky/zcky']);
      }
    });
  }

  ngOnDestroy(): void {
    this.resetVariables();
  }

  @ViewChild('container', { static: false }) container!: ElementRef;

  private resetVariables(): void {
    console.log('Resetting variables..');
    this.songs = undefined;
    this.scrollAmount = 0;
    this.transposeAmount = 0;
    this.stopScrolling();
  }

  private htmlElem: any;
  private scrollInterval: any;
  private medley: string = '';
  scrollAmount: number = 0;
  transposeAmount: number = 0;

  navigate(): void {
    this.router.navigate(['mcky/zcky']);
  }

  startScrolling() {
    this.htmlElem =
      this.container.nativeElement.parentElement.parentElement.parentElement.parentElement;
    console.log('Started Auto Scroll', this.htmlElem.scrollTop);

    if (this.scrollInterval) {
      return;
    }

    this.scrollInterval = setInterval(() => {
      this.htmlElem.scrollTop += this.scrollAmount;
    }, 100);
  }

  stopScrolling() {
    console.log('Stopped Auto Scroll');

    clearInterval(this.scrollInterval);
    this.scrollInterval = null;
  }

  scrollMinus() {
    if (this.scrollAmount > -10) {
      this.scrollAmount -= 0.5;
      this.checkScrollAmount();
    }
  }

  scrollPlus() {
    if (this.scrollAmount < 10) {
      this.scrollAmount += 0.5;
      this.checkScrollAmount();
    }
  }

  checkScrollAmount() {
    if (this.scrollAmount === 0) {
      this.stopScrolling();
    } else {
      this.startScrolling();
    }
  }

  transposeMinus() {
    if (this.transposeAmount > -11) {
      this.transposeAmount -= 1;
    } else {
      this.transposeAmount = 0;
    }
    this.transposeChanges(-1);
  }

  transposePlus() {
    if (this.transposeAmount < 11) {
      this.transposeAmount += 1;
    } else {
      this.transposeAmount = 0;
    }
    this.transposeChanges(1);
  }

  transposeChanges(t: number) {
    let chords = [
      'C',
      'Db',
      'D',
      'Eb',
      'E',
      'F',
      'Gb',
      'G',
      'Ab',
      'A',
      'Bb',
      'B',
    ];

    for (let key in this.songs) {
      if (this.songs.hasOwnProperty(key)) {
        for (let i = 0; i < this.songs[key].length; i++) {
          let schords: string[] = [];
          for (let chord of this.songs[key][i].chords.split('|')) {
            if (this.isNumber(chord)) {
              schords.push(chord);
            } else {
              if (chord.slice(-1) === 'm') {
                schords.push(
                  chords[(chords.indexOf(chord.slice(0, -1)) + t + 12) % 12] +
                    'm'
                );
              } else {
                schords.push(chords[(chords.indexOf(chord) + t + 12) % 12]);
              }
            }
          }

          this.songs[key][i].chords = schords.join('|');
        }
      }
    }
  }

  isNumber(n: string) {
    return !isNaN(Number(n));
  }

  toNumber(n: string) {
    return [...Array(Number(n)).keys()];
  }
}
