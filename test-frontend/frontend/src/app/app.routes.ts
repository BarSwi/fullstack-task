
import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';

export enum Paths {
    home = '',
    simulationDetials = 'szczegóły-symulacji',
  }
  

export const routes: Routes = [
    {path: Paths.home, component: HomePageComponent },
    {path: `${Paths.simulationDetials}/:id`, component: DetailsPageComponent},
    {path: '**', redirectTo: Paths.home, pathMatch: 'full'},
];
