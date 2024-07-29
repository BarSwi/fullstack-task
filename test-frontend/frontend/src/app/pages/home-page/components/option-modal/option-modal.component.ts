import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Simulation } from '../../../../services/models/simulation';
import { ApiService } from '../../../../services/api/api-service';

@Component({
  selector: 'app-option-modal',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './option-modal.component.html',
  styleUrl: './option-modal.component.scss',
})
export class OptionModalComponent {
  @Input() selectedSimulation? : Simulation;
  @Output() cancelClicked = new EventEmitter();
  @Output() deleteSimulation = new EventEmitter<Simulation>();

  private readonly api = inject(ApiService);

  onCancelClick(){
    this.cancelClicked.emit();
  }

  removeSimulation(){
    if(!this.selectedSimulation) return;

    this.api.deleteSimulation(this.selectedSimulation.ID).subscribe({
      next: (reponse: any) => {
        this.deleteSimulation.emit(this.selectedSimulation);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
