import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader-component',
  standalone: true,
  imports: [MatProgressSpinnerModule],
  templateUrl: './loader-component.component.html',
  styleUrl: './loader-component.component.scss'
})
export class LoaderComponentComponent {

}
