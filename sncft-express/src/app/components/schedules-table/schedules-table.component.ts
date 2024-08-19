import { Component,AfterViewInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-schedules-table',
  template: `
    <!-- start of the table ---------------------------------->
    <mat-form-field appearance="fill">
  
  <input matInput (keyup)="applyFilter($event)" placeholder="Search">
  <button mat-icon-button matSuffix disabled>
    <mat-icon>search</mat-icon>
  </button>
</mat-form-field>
  <div class="example-container">
    
  <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">

    <!-- Position Column -->
    <ng-container matColumnDef="OpId">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Op Id. </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.OpId}} </td>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="departure">
      <th mat-header-cell *matHeaderCellDef> Departure </th>
      <td mat-cell *matCellDef="let schedule">
      {{schedule.departure_location}}<br>
    <span style="color: gray;">{{schedule.departure_time | date:'short'}}</span>
  </td>
    </ng-container>

    <!-- Weight Column -->
    <ng-container matColumnDef="arrival">
      <th mat-header-cell *matHeaderCellDef> Arrival </th>
      <td mat-cell *matCellDef="let schedule">
      {{schedule.arrival_location}}<br>
    <span style="color: gray;">{{schedule.arrival_time | date:'short'}}</span>
  </td>
    </ng-container>

    <!-- Symbol Column -->
    <ng-container matColumnDef="freight">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Freight </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.freight}} </td>
    </ng-container>

    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef mat-sort-header> Status </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.status}} </td>
    </ng-container>

    <ng-container matColumnDef="info">
      <th mat-header-cell *matHeaderCellDef> details </th>
      <td mat-cell *matCellDef="let schedule" class="info-column">
        <button mat-icon-button (click)="showMoreInfo(schedule)">
          <mat-icon style="color: green;">keyboard_arrow_right</mat-icon>
        </button>
      </td>
    </ng-container>

    <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true"></tr>
    <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
  </table>
</div>
  `,
  styleUrl: './schedules-table.component.css'
})
export class SchedulesTableComponent implements AfterViewInit {
  displayedColumns = ['OpId', 'departure', 'arrival', 'freight','status','info'];
  dataSource = new MatTableDataSource(schedulesData);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router:Router){

  }

  ngAfterViewInit(){
    this.dataSource.sort=this.sort;
  }
  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }
  showMoreInfo(schedule: SchedulesTable) {
    console.log(schedule.OpId);
    this.router.navigate(['/operations',schedule.OpId]);
  }
}

export interface SchedulesTable {
  OpId:number;
  departure_location:string;
  departure_time:Date;
  arrival_location:string;
  arrival_time:Date;
  freight:string;
  status:string;

}

const schedulesData: SchedulesTable[] = [
  {
    OpId: 101,
    departure_location: 'New York, NY',
    departure_time: new Date('2024-08-18T08:30:00'),
    arrival_location: 'Los Angeles, CA',
    arrival_time: new Date('2024-08-19T18:45:00'),
    freight: 'Electronics',
    status: 'In Transit'
  },
  {
    OpId: 102,
    departure_location: 'Chicago, IL',
    departure_time: new Date('2024-08-18T10:00:00'),
    arrival_location: 'Houston, TX',
    arrival_time: new Date('2024-08-18T22:15:00'),
    freight: 'Automobile Parts',
    status: 'Departed'
  },
  {
    OpId: 103,
    departure_location: 'San Francisco, CA',
    departure_time: new Date('2024-08-17T14:30:00'),
    arrival_location: 'Seattle, WA',
    arrival_time: new Date('2024-08-18T06:00:00'),
    freight: 'Furniture',
    status: 'Arrived'
  },
  {
    OpId: 104,
    departure_location: 'Miami, FL',
    departure_time: new Date('2024-08-18T05:00:00'),
    arrival_location: 'Atlanta, GA',
    arrival_time: new Date('2024-08-18T14:00:00'),
    freight: 'Perishable Goods',
    status: 'Delayed'
  },
  {
    OpId: 105,
    departure_location: 'Dallas, TX',
    departure_time: new Date('2024-08-18T09:15:00'),
    arrival_location: 'Denver, CO',
    arrival_time: new Date('2024-08-18T20:30:00'),
    freight: 'Machinery',
    status: 'In Transit'
  },
  {
    OpId: 106,
    departure_location: 'Boston, MA',
    departure_time: new Date('2024-08-18T07:45:00'),
    arrival_location: 'Philadelphia, PA',
    arrival_time: new Date('2024-08-18T12:30:00'),
    freight: 'Books',
    status: 'Arrived'
  },
  {
    OpId: 107,
    departure_location: 'Las Vegas, NV',
    departure_time: new Date('2024-08-18T11:00:00'),
    arrival_location: 'Phoenix, AZ',
    arrival_time: new Date('2024-08-18T15:45:00'),
    freight: 'Consumer Goods',
    status: 'In Transit'
  },
  {
    OpId: 108,
    departure_location: 'Seattle, WA',
    departure_time: new Date('2024-08-18T06:00:00'),
    arrival_location: 'Portland, OR',
    arrival_time: new Date('2024-08-18T09:30:00'),
    freight: 'Electronics',
    status: 'Departed'
  },
  {
    OpId: 109,
    departure_location: 'Washington, D.C.',
    departure_time: new Date('2024-08-18T08:00:00'),
    arrival_location: 'Baltimore, MD',
    arrival_time: new Date('2024-08-18T09:30:00'),
    freight: 'Medical Supplies',
    status: 'Arrived'
  },
  {
    OpId: 110,
    departure_location: 'Detroit, MI',
    departure_time: new Date('2024-08-18T13:15:00'),
    arrival_location: 'Cleveland, OH',
    arrival_time: new Date('2024-08-18T18:00:00'),
    freight: 'Industrial Equipment',
    status: 'In Transit'
  },
  {
    OpId: 111,
    departure_location: 'Orlando, FL',
    departure_time: new Date('2024-08-18T04:45:00'),
    arrival_location: 'Tampa, FL',
    arrival_time: new Date('2024-08-18T07:00:00'),
    freight: 'Food Products',
    status: 'Departed'
  },
  {
    OpId: 112,
    departure_location: 'Denver, CO',
    departure_time: new Date('2024-08-18T10:30:00'),
    arrival_location: 'Salt Lake City, UT',
    arrival_time: new Date('2024-08-18T15:30:00'),
    freight: 'Textiles',
    status: 'In Transit'
  },
  {
    OpId: 113,
    departure_location: 'Memphis, TN',
    departure_time: new Date('2024-08-18T12:00:00'),
    arrival_location: 'Nashville, TN',
    arrival_time: new Date('2024-08-18T16:00:00'),
    freight: 'Pharmaceuticals',
    status: 'Arrived'
  },
  {
    OpId: 114,
    departure_location: 'Kansas City, MO',
    departure_time: new Date('2024-08-18T09:00:00'),
    arrival_location: 'St. Louis, MO',
    arrival_time: new Date('2024-08-18T13:45:00'),
    freight: 'Construction Materials',
    status: 'In Transit'
  },
  {
    OpId: 115,
    departure_location: 'Minneapolis, MN',
    departure_time: new Date('2024-08-18T11:15:00'),
    arrival_location: 'Milwaukee, WI',
    arrival_time: new Date('2024-08-18T15:00:00'),
    freight: 'Chemical Products',
    status: 'Departed'
  }
];

