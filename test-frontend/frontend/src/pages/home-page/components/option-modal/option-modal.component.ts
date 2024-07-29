import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Simulation } from '../../../../app/services/models/simulation';

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

  onCancelClick(){
    this.cancelClicked.emit();
  }
}
