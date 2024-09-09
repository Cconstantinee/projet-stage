import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { OperationsService } from '../../services/operations.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup} from '@angular/forms';
import { FreightService } from '../../services/freight.service';
import { location, LocationsService } from '../../services/locations.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-operation-form',
  templateUrl: './operation-form.component.html',
  styleUrl: './operation-form.component.css'
})
export class OperationFormComponent implements OnInit{
  //variables------------------------------------------------------------------------------------------#1000-----------
  confirm: string = '';
  id?: number;
  operationdata=new FormGroup({
    departure_location:new FormControl<string>(''),
    arrival_location:new FormControl<string>(''),
    departure_time:new FormControl<Date | null>(null),
    arrival_time:new FormControl<Date | null>(null),
    train_id:new FormControl<number | null>(null),
    freight:new FormControl<freight[]>([])
  })
  states: location[]=[];










//constructor and oninit-------------------------------------------------------------------------------#2000-----------
  constructor(private operationsService:OperationsService,private router:Router,
    public dialogRef: MatDialogRef<OperationFormComponent>,private freightService:FreightService,private locationsService:LocationsService
    
  ) {
    // Assuming the ID is passed to the dialog
  }
  ngOnInit(): void {
    
    this.locationsService.getLocations().subscribe(
      (res:location[])=>{this.states=res}
    );
  }
  
//functions -------------------------------------------------------------------------------------------#3000-----------
  confirmed(): void {
    if (this.confirm === 'yes') {
      console.log('Deletion confirmed');
      
      this.dialogRef.close(true); // Close dialog and pass true as result
    } else {
      alert('Please type "yes" to confirm.'); // Show alert if not 'yes'
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

export interface freight{
  freight_type:string;
  total_units:number;
  total_weight:number;
  total_value:number
}