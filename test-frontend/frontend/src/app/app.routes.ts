
import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { DetailsPageComponent } from './pages/details-page/details-page.component';
import { EditSimulationComponent } from './pages/edit-simulation/edit-simulation.component';

export enum Paths {
    home = '',
    simulationDetials = 'szczegóły-symulacji',
    editSimulation = "edytuj-symulacje"
  }
  

export const routes: Routes = [
    {path: Paths.home, component: HomePageComponent },
    {path: `${Paths.simulationDetials}/:id`, component: DetailsPageComponent},
    {path: `${Paths.editSimulation}/:id`, component: EditSimulationComponent},
    {path: '**', redirectTo: Paths.home, pathMatch: 'full'},
];
