import { Component } from '@angular/core';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { OptionModalComponent } from './components/option-modal/option-modal.component';
import { Simulation } from '../../app/services/models/simulation';
import { fadeIn } from '../../Utils/animations';
import { SimulationFormComponent } from '../../app/components/simulation-form/simulation-form.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponentComponent, OptionModalComponent, SimulationFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [fadeIn]
})
export class HomePageComponent {
  selectedSimulation? :Simulation;
  showCreationForm: boolean = false;

  onRowClicked(row: Simulation) {
    this.selectedSimulation = row == this.selectedSimulation ? undefined : row;
  }
  resetSelection(){
    this.selectedSimulation = undefined;
  }
}
