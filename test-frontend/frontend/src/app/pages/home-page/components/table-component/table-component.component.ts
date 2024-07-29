import {Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { Simulation } from '../../../../services/models/simulation';
import { ApiService } from '../../../../services/api/api-service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { LoaderComponentComponent } from '../../../../components/loader-component/loader-component.component';

@Component({
  selector: 'app-table-component',
  standalone: true,
  imports: [MatTableModule, CommonModule, MatIconModule, MatFabButton, LoaderComponentComponent  ],
  templateUrl: './table-component.component.html',
  styleUrl: './table-component.component.scss'
})
export class TableComponentComponent {
  @Output() rowClicked = new EventEmitter<Simulation>();
  @Output() openForm = new EventEmitter();
  @Input() selectedSimulation?: Simulation;
  readonly displayedColumns: string[] = ['N', 'P', 'I', 'R', 'M','Ti','Ts','Tm'];
  dataSource = new MatTableDataSource<Simulation>();
  loading: boolean = true;
  error: boolean = false;

  private readonly api = inject(ApiService);
  
  ngOnInit(): void {
    this.loadSimulations();
  }

  loadSimulations(): void {
    this.api.getSimulations().subscribe({
      next: (response: Simulation[]) => {
        this.dataSource.data = response;
      },
      error: (err) => {
        this.error = true;
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }

  onRowClick(row: Simulation){
    this.rowClicked.emit(row);
  }

  addSimulation(simulation: Simulation) : void{
    const data = this.dataSource.data; 
    data.push(simulation);

    //Zmiana całej referencji, żeby angular tab się zaktualizował
    //TODO: Find better way
    this.dataSource.data = [...data];
  }

  deleteSimulation(simulation: Simulation) : void{
    const data = this.dataSource.data;
    const updatedData = data.filter(value => value !== simulation);
    this.dataSource.data = [...updatedData];
  }

  openCreationForm(){
    this.openForm.emit();
  }
}
