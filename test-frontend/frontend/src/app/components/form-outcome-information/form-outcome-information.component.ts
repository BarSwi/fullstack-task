import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-outcome-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-outcome-information.component.html',
  styleUrl: './form-outcome-information.component.scss'
})
export class FormOutcomeInformationComponent {
  @Input() error? :HttpErrorResponse;
  @Input() successMessage?: string = "Z powodzeniem dodano nową symulację."
  errorMessage?: string


  ngOnInit(){
    this.determineErrorMessage();
  }

  determineErrorMessage(){
    if(this.error){
      switch(this.error.status){
        case 400:
          this.errorMessage="Niepoprawne dane w formularzu!";
          break;
        default:
          this.errorMessage="Coś poszło nie tak po naszej stronie. Prosimy spróbować później."
          break;
      }
    }
  }
}
