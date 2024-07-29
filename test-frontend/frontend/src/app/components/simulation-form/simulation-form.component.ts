import { Component, inject, Input, OnInit } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Simulation } from '../../services/models/simulation';
import { FormType } from '../../enums/form-type.enum';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { checkIfNumber, checkMaximumValue, checkMinimumValue, compareFields, nameNotEmpty } from '../../../Utils/form-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-simulation-form',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule,  ReactiveFormsModule, MatButtonModule, MatTooltipModule, CommonModule],
  templateUrl: './simulation-form.component.html',
  styleUrl: './simulation-form.component.scss',
})
export class SimulationFormComponent {
  @Input() simulation? : Simulation;
  @Input() formType : FormType = FormType.CREATE;
  FormType = FormType;

  form!: FormGroup;

  fb = inject(FormBuilder);
  defaultValues = {
    N: '',
    P: 1,
    I: 1,
    R: 1,
    M: 0,
    Ti: 2,
    Tm: 1,
    Ts: 1
  }
  ngOnInit(){
    this.setDefaultValues();
    this.initializeForm();

  }

  setDefaultValues(){
    if(this.simulation){
      this.defaultValues.N = this.simulation.N;
      this.defaultValues.P = this.simulation.P;
      this.defaultValues.I = this.simulation.I;
      this.defaultValues.R = this.simulation.R;
      this.defaultValues.M = this.simulation.M;
      this.defaultValues.Ti = this.simulation.Ti;
      this.defaultValues.Tm = this.simulation.Tm;
      this.defaultValues.Ts = this.simulation.Ts;
    }
  }

  initializeForm(){
    this.form=this.fb.group({
      name: [this.defaultValues.N, [nameNotEmpty()]],
      P: [this.defaultValues.P, [checkIfNumber(), checkMinimumValue(1)]],
      I: [this.defaultValues.I, [checkIfNumber(), checkMinimumValue(1)]],
      R: [this.defaultValues.R, [checkIfNumber(), checkMinimumValue(1)]],
      M: [this.defaultValues.M, [checkIfNumber(), checkMinimumValue(0), checkMaximumValue(1)]],
      Ti: [this.defaultValues.Ti, [checkIfNumber(), checkMinimumValue(2)]],
      Tm: [this.defaultValues.Tm, [checkIfNumber(), checkMinimumValue(1)]],
      Ts: [this.defaultValues.Ts, [checkIfNumber(), checkMinimumValue(1)]],
    }, {
      validators: compareFields('Ti', 'Tm')
    });
  }

  handleForm(){

  }

  test(){
    console.log(this.form.get('Tm'));
  }
}
