import { AfterViewInit, Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-widget',
  template: `
    <div class="p-2">
    <mat-card matRipple [matRippleTrigger]="trigger" appearance="raised" style="height:120px">
      <mat-card-header class="spaced-header z-1">
        <mat-card-title class="d-flex mb-2">
          {{id}}
        </mat-card-title>
        <div #trigger>
        <a mat-icon-button (click)="goToRig(id)" (mouseover)="iconColor = 'green'" (mouseout)="iconColor = 'lightgray'">
          <mat-icon [style.color]="iconColor">open_in_new</mat-icon>
        </a>
        </div>
      </mat-card-header>
      
      <!--widget content----------------------------------------------------------------------------->
      <mat-card-content>
        <div class="spaced-header">
        
        <span class="ship-icon" [ngClass]="getRigStatusClass()">{{rig_status}}</span><span class="m-2 ship-icon" [ngClass]="getMaintenanceStatusClass()">{{maintenance_status}}</span>

        </div>
      </mat-card-content>
      <!--widget content----------------------------------------------------------------------------->
    </mat-card>
    </div>
  `,
  styleUrl: './data-widget.component.css'
})
export class DataWidgetComponent{
  
  iconColor: string = 'lightgray';
  @Input() id:string="N/A";
  @Input() rig_status:string="-no data-";
  @Input() maintenance_status:string="-no data-"
  constructor(private router: Router) {}

  getRigStatusClass(): string {
    switch (this.rig_status) {
      case 'online':
        return 'rig-online';
      case 'offline':
        return 'rig-offline';
      case 'stand by':
        return 'rig-standby';
      case 'in storage':
        return 'rig-in-storage';
      default:
        return 'rig-default';
    }
  }

  getMaintenanceStatusClass(): string {
    switch (this.maintenance_status) {
      case 'good condition':
        return 'maintenance-good';
      case 'moderate':
        return 'maintenance-moderate';
      case 'needs attention':
        return 'maintenance-attention';
      case 'critical':
        return 'maintenance-critical';
      case 'in maintenance':
        return 'maintenance-in-maintenance';
      default:
        return 'maintenance-default';
    }
  }
  goToRig(rigId: string) {
    this.router.navigate([{ outlets: { rigInfo: [`fleet/${rigId}`] } }]);
  }
}
