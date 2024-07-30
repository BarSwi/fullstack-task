import { Component, inject } from '@angular/core';
import { SimulationFormComponent } from '../../components/simulation-form/simulation-form.component';
import { Simulation } from '../../services/models/simulation';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api-service';
import { LoaderComponentComponent } from '../../components/loader-component/loader-component.component';
import { FormType } from '../../enums/form-type.enum';
import { FormOutcomeInformationComponent } from '../../components/form-outcome-information/form-outcome-information.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-edit-simulation',
  standalone: true,
  imports: [SimulationFormComponent, LoaderComponentComponent, FormOutcomeInformationComponent],
  templateUrl: './edit-simulation.component.html',
  styleUrl: './edit-simulation.component.scss',
})
export class EditSimulationComponent {
  simulation?: Simulation
  simulationId?: any
  loaded: boolean = false;
  blockForm: boolean = false;
  FormType = FormType.EDIT

  successMessage: string = "Edycja powiodła się! Przekierowywanie...";
  formError?: HttpErrorResponse;

  showFormOutcome: boolean = false;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly api = inject(ApiService);

  ngOnInit(): void{
    this.initializeId();
    this.initializeSimulation();
  }

  initializeSimulation():void{
    if(!this.simulation){
      this.api.getSimulation(this.simulationId).subscribe({
        next: (response: Simulation) => {
          this.simulation = response;
          if(this.simulation === null) this.router.navigate(['/']);
        },
        error: (err) => {
          console.log(err);
          this.router.navigate(['/'])
        },
        complete: () =>{
          this.loaded=true;
        }
      });
    }
    else{
      this.loaded=true;
    }
  }

  initializeId():void{
    this.simulationId = this.route.snapshot.paramMap.get('id');
    const numericId = parseInt(this.simulationId, 10);
    if(!this.simulationId || isNaN(numericId)) this.router.navigate(['/']);
  }

  cancelEdit(): void{
    this.navigateToDetails();
  }

  editSuccess():void{
    this.formError = undefined;
    this.showFormOutcome=true;
    this.blockForm=true;

    setTimeout(() => {
      this.navigateToDetails();
    }, 2000);
  }
  editError(error: HttpErrorResponse): void{
    this.formError = error;
    this.showFormOutcome = true;
    this.blockForm=true;

    setTimeout(() => {
      this.blockForm=false;
      this.showFormOutcome=false;
    }, 2000);
  }

  navigateToDetails():void{
    this.router.navigate([`/szczegóły-symulacji/${this.simulationId}`]);
  }
}
