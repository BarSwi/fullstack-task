import { Component, HostListener, Input } from '@angular/core';
import { Color, NgxChartsModule, ScaleType }from '@swimlane/ngx-charts'
import { Result } from '../../../../services/models/result';

@Component({
  selector: 'app-daily-card',
  standalone: true,
  imports: [NgxChartsModule],
  templateUrl: './daily-card.component.html',
  styleUrl: './daily-card.component.scss'
})
export class DailyCardComponent {
  @Input() result! : Result;
  transformedData: any;
  viewCard: [number, number] = [400, 250];
  viewBar: [number, number]=[600,300];

  windowWidth?: number;
  previousWindowWidth: number = window.innerWidth;


  // @HostListener('window:resize', ['$event'])
  // onResize(event: Event) :void{
  //     this.windowWidth = (event.target as Window).innerWidth;
  //     if(this.windowWidth <= 1000  && this.previousWindowWidth > 1000) this.viewCard = [500,300];
  //     else if(this.windowWidth >=1000 && this.previousWindowWidth < 1000) this.viewCard = [400,250];
  //     else if(this.windowWidth <=600 && this.previousWindowWidth > 600){
  //       this.viewBar = [350,200];
  //       this.viewCard = [350, 200];
  //     }
  //     else if(this.windowWidth > 600 && this.previousWindowWidth <= 600){
  //       this.viewCard = [400,250];
  //       this.viewBar = [600,300];
  //     }
  //     this.previousWindowWidth = this.windowWidth;
  // }

  // setDefaultViewValues() :void{
  //   if(this.previousWindowWidth <= 1000) this.viewCard = [500,300];
  // }

  ngOnInit(){
    this.initializeData();
    //this.setDefaultViewValues();
  }
  colorScheme: Color = {
    name: 'basicScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#FFA500', '#D32F2F', '#66BB6A', '#388E3C']
  };
  cardColor: string = '#424242   ';


  initializeData() : void{
    this.transformedData = [
      { name: 'PI', value: this.result.pi },
      { name: 'PM', value: this.result.pm },
      { name: 'PR', value: this.result.pr },
      { name: 'PV', value: this.result.pv },
  ];
  }
}
