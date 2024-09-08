import { Component, Input, OnInit } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { fleet } from '../../services/fleet';
@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css'
})
export class FleetComponent implements OnInit{
  @Input() isWidget:boolean=false;
  maintenanceStatusTable: string[] = ['needs attention','critical'];
  constructor(private fleetService:FleetService){}
  fleetTable:fleet[]=[];
  ngOnInit(): void {
    this.fleetService.getHoleFleet().subscribe(
      (res)=>{
        this.fleetTable=res;
      }
    );
  }
  convertID(id: string,type: string): string {
    let convertedId=id;
    if(type=='locomotive'){
      convertedId="E"+id;
    }
    else{
      convertedId="C"+id;
    }
    return convertedId;
}
isMaintenanceStatusIncluded(status: string): boolean {
  return this.maintenanceStatusTable.includes(status);
}
}
