import { Component, ViewChild } from '@angular/core';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { OptionModalComponent } from './components/option-modal/option-modal.component';
import { Simulation } from '../../services/models/simulation';
import { fadeIn } from '../../Utils/animations';
import { SimulationFormComponent } from '../../components/simulation-form/simulation-form.component';


@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponentComponent, OptionModalComponent, SimulationFormComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [fadeIn]
})
export class HomePageComponent {
  @ViewChild(TableComponentComponent) tableComponent!: TableComponentComponent;
  selectedSimulation? :Simulation;
  showCreationForm: boolean = false;

  onRowClicked(row: Simulation) {
    this.selectedSimulation = row == this.selectedSimulation ? undefined : row;
  }
  resetSelection(){
    this.selectedSimulation = undefined;
  }

  handleFormSuccess(simulation: Simulation){
    this.showCreationForm = false;
    this.tableComponent.addSimulation(simulation);
  }

  handleFormError(error: any){
    this.showCreationForm=false;
  }

  deleteSimulation(simulation: Simulation){
    this.tableComponent.deleteSimulation(simulation);
    this.selectedSimulation=undefined;
  }

  openForm() : void{
    this.showCreationForm=true;
  }
  closeForm() : void{
    this.showCreationForm=false;
  }
}
