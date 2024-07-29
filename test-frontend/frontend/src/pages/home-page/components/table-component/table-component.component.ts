import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Simulation } from '../../../../app/services/models/simulation';
import { ApiService } from '../../../../app/services/api/api-service';
import {MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [MatTableModule, MatProgressSpinnerModule, CommonModule  ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {

  @Output() rowClicked = new EventEmitter<Simulation>();
  @Input() selectedSimulation?: Simulation;
  readonly displayedColumns: string[] = ['N', 'P', 'I', 'R', 'M','Ti','Ts','Tm'];
  dataSource: Simulation[] = [];
  loading: boolean = true;
  error: boolean = false;

  private readonly api = inject(ApiService);
  
  ngOnInit(): void {
    this.loadSimulations();
  }

  loadSimulations(): void {
    this.api.getSimulations().subscribe({
      next: (response: Simulation[]) => {
        this.dataSource = response;
      },
      error: (err) => {
        this.error = true;
        console.error('Error fetching simulations', err);
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onRowClick(row: Simulation){
    this.rowClicked.emit(row);
  }
}
