import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, interval } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  standalone: true,
  imports: [
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    NgxChartsModule,
  ],
  selector: 'app-system-info',
  templateUrl: './system-info.component.html',
  styleUrls: ['./system-info.component.css'],
})
export class SystemInfoComponent implements OnInit, OnDestroy {
  systemInfo: any;
  temp: number[] = [];
  core1: number[] = [];
  core2: number[] = [];
  core3: number[] = [];
  core4: number[] = [];
  mem = 0;

  tempSettings = {
    valueFormatter: (v: number) => `${v} °C`,
    height: 100,
    showTooltip: true,
    showHighlight: true,
  };

  usageSettings = {
    valueFormatter: (v: number) => `${v}%`,
    height: 100,
    showTooltip: true,
    showHighlight: true,
  };

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    interval(1000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.fetchSystemInfo());
  }

  fetchSystemInfo(): void {
    this.http
      .get<any>('https://piback.mckyzcky.com/api/systeminfo')
      .subscribe((data) => {
        this.systemInfo = data;

        if (this.temp.length > 10) {
          this.temp = [...this.temp.slice(-10), data.cpuTemp.toFixed(2)];
          this.core1 = [
            ...this.core1.slice(-10),
            data.cpuUsage[0].load.toFixed(2),
          ];
          this.core2 = [
            ...this.core2.slice(-10),
            data.cpuUsage[1].load.toFixed(2),
          ];
          this.core3 = [
            ...this.core3.slice(-10),
            data.cpuUsage[2].load.toFixed(2),
          ];
          this.core4 = [
            ...this.core4.slice(-10),
            data.cpuUsage[3].load.toFixed(2),
          ];
        } else {
          this.temp.push(data.cpuTemp.toFixed(2));
          this.core1.push(data.cpuUsage[0].load.toFixed(2));
          this.core2.push(data.cpuUsage[1].load.toFixed(2));
          this.core3.push(data.cpuUsage[2].load.toFixed(2));
          this.core4.push(data.cpuUsage[3].load.toFixed(2));
        }

        this.mem = parseFloat(
          ((data.memoryUsage.used * 100) / data.memoryUsage.total).toFixed(2)
        );
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
