import {ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MatDivider } from '@angular/material/divider';
import {MatSelectModule} from '@angular/material/select'; 
import { FormControl,FormGroup,FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {JsonPipe} from '@angular/common';
import { CommonModule } from '@angular/common';
import { Operation } from '../../services/operations';
import {MatButtonModule} from '@angular/material/button';
import { OperationsService } from '../../services/operations.service';
import { location, LocationsService } from '../../services/locations.service';
import { freight, FreightService } from '../../services/freight.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter-table',
  standalone: true,
  template: `
  <form [formGroup]="filterTable" (submit)="onSubmit()" (reset)="onSubmit()">
    
  <p>by location</p>
  <mat-divider></mat-divider><br>
<mat-form-field>
  <mat-label>Departure</mat-label>
<!--departure-------------------------------------------------------------->  
  <mat-select formControlName="departure_location">
    <mat-option>None</mat-option>
    @for (state of states; track state) {
      <mat-option [value]="state.location_name">{{state.location_name}}</mat-option>
    }
  </mat-select>
</mat-form-field>
<!--arrival-------------------------------------------------------------->
<mat-form-field>
  <mat-label >Arrival</mat-label>
  <mat-select formControlName="arrival_location">
    <mat-option>None</mat-option>
    @for (state of states; track state) {
      <mat-option [value]="state.location_name">{{state.location_name}}</mat-option>
    }
  </mat-select>
</mat-form-field><br>
<!--dates-----------------------------------------------------------------------------------------------------------------------#1000------>
<p>by date</p>
<mat-divider></mat-divider><br>
<p><mat-slide-toggle (change)="onToggleTimeRange($event)" name="timeRangeToggle">time range</mat-slide-toggle></p>

<!--single date picker----------------------------------------------------------------------------------------------------------#2000-------------------->
<mat-form-field style="width: 210px;" *ngIf="isTimeRangeOn===false">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker" formControlName="date">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<!--multi date picker-----------------------------------------------------------------------------------------------------------#3000------------------->

<mat-form-field style="width: 210px;" *ngIf="isTimeRangeOn===true">
  <mat-label>Enter a date range</mat-label>
  <mat-date-range-input [formGroup]="range" [rangePicker]="picker">
    <input matStartDate formControlName="start" placeholder="Start">
    <input matEndDate formControlName="end" placeholder="End">
  </mat-date-range-input>
  <mat-hint>-MM/DD/YYYY–</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-date-range-picker #picker></mat-date-range-picker>

  @if (range.controls.start.hasError('matStartDateInvalid')) {
    <mat-error>Invalid start date</mat-error>
  }
  @if (range.controls.end.hasError('matEndDateInvalid')) {
    <mat-error>Invalid end date</mat-error>
  }
</mat-form-field>
<br><br>



<!--multi date picker-------------------------------------------------------------------------------------------------------#4000----------------------->

<p>by cargo</p>
<mat-divider></mat-divider><br>

<mat-form-field>
  <mat-label>cargo</mat-label>
  <mat-select formControlName="freight" multiple>
    @for (cargo of cargoList; track cargo) {
      <mat-option [value]="cargo.freight_type">{{cargo.freight_type}}</mat-option>
    }
  </mat-select>
</mat-form-field>
<div class="spaced-header">
<button mat-raised-button type="reset">
  reset
</button>
    <button mat-raised-button color="primary" type="submit">
  apply
</button>
</div>
  </form>
  
  <!--multi date picker-------------------------------------------------------------------------------------------------------#5000----------------------->
  `,
  styleUrl: './filter-table.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatDivider,MatSelectModule,FormsModule, ReactiveFormsModule,MatSlideToggleModule,JsonPipe,MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
//------------------------------------------------------------------------------------------------------------------------
export class FilterTableComponent implements OnInit{

  @Output() updateTable = new EventEmitter<any>();
  isTimeRangeOn: boolean = false;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  

filterTable= new FormGroup({
  departure_location : new FormControl(''),
  arrival_location : new FormControl(''),
  freight : new FormControl(''),
  date: new FormControl<Date | null>(null),
  date_range: this.range
});

constructor(private operationsService: OperationsService, private locationsService:LocationsService, private freightService:FreightService,private filterService:FilterService){}

ngOnInit(): void {
  if (this.isTimeRangeOn) {
    this.filterTable.get('date')?.disable();       // Disable single date
    this.filterTable.get('range')?.enable();       // Enable date range
  } else {
    this.filterTable.get('range')?.disable();      // Disable date range
    this.filterTable.get('date')?.enable();        // Enable single date
  }
  this.freightService.getFreightTypes().subscribe(
    (res:freight[])=>{this.cargoList=res}
  )
  this.locationsService.getLocations().subscribe(
    (res:location[])=>{this.states=res}
  )
  
}
onToggleTimeRange(event: any) {
  this.isTimeRangeOn = event.checked;  // Update the value based on the toggle state
  this.ngOnInit();
}

onSubmit() {
  console.log(this.filterTable.value,this.isTimeRangeOn);
  this.updateTable.emit("update pending");
  this.filterService.sendFormData(this.filterTable.value,this.isTimeRangeOn).subscribe(
    (res)=>{this.operationsService.cachedOperations=res;
            this.updateTable.emit("update complete");
            console.log('event emitted');
    },
    (error)=>{console.log('error message',error)}
  )
  
}
  cargoList: freight[] = [
    
  ];
  states: location[] = [
    
  ];
}
