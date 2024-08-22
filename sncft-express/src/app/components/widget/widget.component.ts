import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  template: `
    <div class="p-2">
    <mat-card appearance="raised" [style.height]="widget_height">
      <mat-card-header class="spaced-header">
        <mat-card-title>
          {{widget_title}}
          
        </mat-card-title>
        <a mat-icon-button [routerLink]="'/'+widget_selector"
   (mouseover)="iconColor = 'green'" 
   (mouseout)="iconColor = 'lightgray'" *ngIf="[3, 4, 5].includes(widget_index)">
  <mat-icon [style.color]="iconColor">open_in_new</mat-icon>
</a>
      </mat-card-header>
      <!--widget content----------------------------------------------------------------------------->
      <mat-card-content>
      
      <div [ngSwitch]="widget_index">
        <app-schedules-table *ngSwitchCase="3" [isWidget]="true" size="140px"></app-schedules-table>
        <div *ngSwitchDefault></div>
      </div>
      </mat-card-content>
      <!--widget content----------------------------------------------------------------------------->
    </mat-card>
    </div>
  `,
  styleUrl: './widget.component.css'
})
export class WidgetComponent implements OnInit{


iconColor: string = 'lightgray';
@Input() widget_selector:string="";
@Input() widget_height: string="140px";
@Input()  widget_title: string="no data";
@Input() widget_index:any;
ngOnInit(): void {
  this.widget_index=Number(this.widget_index);
}
}
