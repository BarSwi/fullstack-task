import { Component, inject } from '@angular/core';
import { SimulationWithResults } from '../../services/models/simulation';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api/api-service';
import { DailyCardComponent } from './components/daily-card/daily-card.component';
import { CommonModule } from '@angular/common';
import { LoaderComponentComponent } from '../../components/loader-component/loader-component.component';


@Component({
  selector: 'app-details-page',
  standalone: true,
  imports: [DailyCardComponent, CommonModule, LoaderComponentComponent],
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent {
  simulation!: SimulationWithResults
  loaded: boolean = false;

  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly api = inject(ApiService);
  ngOnInit(){
    this.fetchSimulation();

  }
  fetchSimulation(): void{
    let id : any = this.route.snapshot.paramMap.get('id');
    this.validateId(id);
    id = parseInt(id,10);

    this.api.getSimulation(id).subscribe({
      next: (response: SimulationWithResults) => {
        this.simulation = response;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () =>{
        this.loaded=true;
      }
    });
  }

  validateId(id: any):void{
    const parsedId = parseInt(id, 10);
    if(isNaN(parsedId)) this.router.navigate(['/']);
  }
}
