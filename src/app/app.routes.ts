import { Routes } from '@angular/router';
import { TabsComponent } from './tabs/tabs.component';
import { HomeComponent } from './home/home.component';
import { SystemInfoComponent } from './system-info/system-info.component';
import { PagesComponent } from './pages/pages.component';
import { SangeetComponent } from './sangeet/sangeet.component';

export const routes: Routes = [
  { path: '404', component: HomeComponent },
  { path: 'mcky/zcky', component: PagesComponent },
  // { path: 'systeminfo', component: SystemInfoComponent },
  { path: 'tabs/:medley', component: TabsComponent },
  { path: 'wedding', component: SangeetComponent },
  { path: '**', redirectTo: 'mcky/zcky' },
];
