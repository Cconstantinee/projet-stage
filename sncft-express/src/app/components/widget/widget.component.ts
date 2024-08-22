import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget',
  template: `
    <div class="p-2">
    <mat-card appearance="raised" [style.height]="widget_height">
      <mat-card-header class="spaced-header z-1">
        <mat-card-title class="d-flex mb-2">
          {{widget_title}}
          <div *ngIf="widget_index==3||widget_index==4" class="mx-3" style="position:relative;bottom:2px">
            <mat-button-toggle-group [(ngModel)]='widget_index' appearance="legacy">
              <mat-button-toggle [value]="3" class="bg-success" >freight</mat-button-toggle>
              <mat-button-toggle [value]="4" class="bg-primary">trains</mat-button-toggle>
            </mat-button-toggle-group>
          </div>
        </mat-card-title>
        <a mat-icon-button [routerLink]="'/'+widget_selector"
   (mouseover)="iconColor = 'green'" 
   (mouseout)="iconColor = 'lightgray'" *ngIf="[3, 4, 5,6].includes(widget_index)">
  <mat-icon [style.color]="iconColor">open_in_new</mat-icon>
</a>
      </mat-card-header>
      <!--widget content----------------------------------------------------------------------------->
      <mat-card-content>
      
      <div [ngSwitch]="widget_index">
        <app-schedules-table *ngSwitchCase="3" [isWidget]="true" size="140px"></app-schedules-table>
        <app-activity-table *ngSwitchCase="4" [isWidget]="true" size="140px"></app-activity-table>
        <app-interactive-map-1 *ngSwitchCase="6" [isWidget]="true"></app-interactive-map-1>
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
