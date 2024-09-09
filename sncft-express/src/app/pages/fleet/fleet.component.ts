import { Component, Input, OnInit } from '@angular/core';
import { FleetService } from '../../services/fleet.service';
import { fleet } from '../../services/fleet';
import { Router } from '@angular/router';
@Component({
  selector: 'app-fleet',
  templateUrl: './fleet.component.html',
  styleUrl: './fleet.component.css'
})
export class FleetComponent implements OnInit{

  isLoading:boolean=true;
  @Input() isWidget:boolean=false;
  maintenanceStatusTable: string[] = ['needs attention','critical'];
  constructor(private fleetService:FleetService, private router:Router){}
  fleetTable:fleet[]=[];
  ngOnInit(): void {
    this.fleetService.getHoleFleet().subscribe(
      (res)=>{
        this.fleetTable=res;
        this.isLoading=false;
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
handleEvent(event: string) {
  this.router.navigate([`/fleet/${event}`]);
  }
}
