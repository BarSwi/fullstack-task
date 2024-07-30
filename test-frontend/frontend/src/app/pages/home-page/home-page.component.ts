import { Component, ViewChild } from '@angular/core';
import { TableComponentComponent } from './components/table-component/table-component.component';
import { OptionModalComponent } from './components/option-modal/option-modal.component';
import { Simulation } from '../../services/models/simulation';
import { fadeIn } from '../../Utils/animations';
import { SimulationFormComponent } from '../../components/simulation-form/simulation-form.component';
import { FormOutcomeInformationComponent } from '../../components/form-outcome-information/form-outcome-information.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [TableComponentComponent, OptionModalComponent, SimulationFormComponent, FormOutcomeInformationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  animations: [fadeIn]
})
export class HomePageComponent {
  @ViewChild(TableComponentComponent) tableComponent!: TableComponentComponent;
  selectedSimulation? :Simulation;
  showCreationForm: boolean = false;
  showFormOutcomeInformation: boolean = false;
  formError?: HttpErrorResponse;


  onRowClicked(row: Simulation) {
    this.selectedSimulation = row == this.selectedSimulation ? undefined : row;
  }
  resetSelection(){
    this.selectedSimulation = undefined;
  }

  handleFormSuccess(simulation: Simulation){
    this.showCreationForm = false;
    this.tableComponent.addSimulation(simulation);
    this.showFormOutcomeInformation=true;
    this.resetFormOutcomeInformationTimer();
  }

  handleFormError(error: HttpErrorResponse){
    this.showCreationForm=false;
    this.formError = error;
    this.showFormOutcomeInformation=true;
    this.resetFormOutcomeInformationTimer();
    
  }

  deleteSimulation(simulation: Simulation){
    this.tableComponent.deleteSimulation(simulation);
    this.selectedSimulation=undefined;
  }

  openForm() : void{
    this.showCreationForm=true;
    this.selectedSimulation=undefined;

    this.resetFormOutcomeInformation();
  }
  closeForm() : void{
    this.showCreationForm=false;
  }

  resetFormOutcomeInformationTimer(): void{
    setTimeout(() => {
      this.formError = undefined;
      this.showFormOutcomeInformation = false;
    }, 2000);
  }

  resetFormOutcomeInformation():void{
    this.formError=undefined;
    this.showFormOutcomeInformation=false;
  }
}
