import {ChangeDetectionStrategy, Component} from '@angular/core';
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
@Component({
  selector: 'app-filter-table',
  standalone: true,
  template: `
  <p>by location</p>
  <mat-divider></mat-divider><br>
<mat-form-field>
  <mat-label>Departure</mat-label>
  <mat-select>
    <mat-option>None</mat-option>
    @for (state of states; track state) {
      <mat-option [value]="state">{{state}}</mat-option>
    }
  </mat-select>
</mat-form-field>
<mat-form-field>
  <mat-label>Arrival</mat-label>
  <mat-select>
    <mat-option>None</mat-option>
    @for (state of states; track state) {
      <mat-option [value]="state">{{state}}</mat-option>
    }
  </mat-select>
</mat-form-field><br>

<p>by date</p>
<mat-divider></mat-divider><br>
<p><mat-slide-toggle [(ngModel)]="isTimeRangeOn">time range</mat-slide-toggle></p>

<!--single date picker--------------------------------------------------------------->
<mat-form-field style="width: 210px;" *ngIf="isTimeRangeOn===false">
  <mat-label>Choose a date</mat-label>
  <input matInput [matDatepicker]="picker">
  <mat-hint>MM/DD/YYYY</mat-hint>
  <mat-datepicker-toggle matIconSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>
<!--multi date picker--------------------------------------------------------------->

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



<!--multi date picker--------------------------------------------------------------->

<p>by cargo</p>
<mat-divider></mat-divider><br>

<mat-form-field>
  <mat-label>cargo</mat-label>
  <mat-select [formControl]="cargoFilter" multiple>
    @for (cargo of cargoList; track cargo) {
      <mat-option [value]="cargo">{{cargo}}</mat-option>
    }
  </mat-select>
</mat-form-field>


  `,
  styleUrl: './filter-table.component.css',
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,MatFormFieldModule, MatInputModule, MatDatepickerModule,MatDivider,MatSelectModule,FormsModule, ReactiveFormsModule,MatSlideToggleModule,JsonPipe,],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class FilterTableComponent {
  isTimeRangeOn: boolean = false;
  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  cargoFilter = new FormControl('');
  cargoList: string[] = [
    'Coal',
    'Iron Ore',
    'Grain',
    'Lumber',
    'Automobiles',
    'Container Goods'
  ];
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];
}
