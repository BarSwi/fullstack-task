
import { Routes } from '@angular/router';
import { HomePageComponent } from '../pages/home-page/home-page.component';

export enum Paths {
    home = '',
  }
  

export const routes: Routes = [
    {path: Paths.home, component: HomePageComponent },
];
