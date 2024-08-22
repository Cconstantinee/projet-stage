import { Component, AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity-table',
  template: `
    <mat-form-field appearance="fill" *ngIf="!isWidget">
      <input matInput (keyup)="applyFilter($event)" placeholder="Search">
      <button mat-icon-button matSuffix disabled>
        <mat-icon>search</mat-icon>
      </button>
    </mat-form-field>
    <div class="example-container" [style.height]="size" [ngClass]="{'no-scrollbar': isWidget}">
      <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">
        <ng-container matColumnDef="trainId">
          <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Train Id </th>
          <td mat-cell *matCellDef="let schedule"> {{schedule.trainId}} </td>
        </ng-container>

        <ng-container matColumnDef="departure">
          <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Departure </th>
          <td mat-cell *matCellDef="let schedule">
            {{schedule.departure.location}}<br>
            <span style="color: gray;">{{schedule.departure.time | date:'short'}}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="arrival">
          <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Arrival </th>
          <td mat-cell *matCellDef="let schedule">
            {{schedule.arrival.location}}<br>
            <span style="color: gray;">{{schedule.arrival.time | date:'short'}}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="lastLocation">
          <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Last Location </th>
          <td mat-cell *matCellDef="let schedule">
            {{schedule.lastLocation.location}}<br>
            <span style="color: gray;">Last Updated: {{schedule.lastLocation.lastUpdated | date:'short'}}</span>
          </td>
        </ng-container>

        <ng-container matColumnDef="freight">
          <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Freight </th>
          <td mat-cell *matCellDef="let schedule"> 
            <ng-container *ngIf="schedule.freight.length > 0; else noFreight">
              {{schedule.freight.join(', ')}}
            </ng-container>
            <ng-template #noFreight>No Cargo</ng-template>
          </td>
        </ng-container>

        <ng-container matColumnDef="status">
          <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Status </th>
          <td mat-cell *matCellDef="let schedule"> {{schedule.status}} </td>
        </ng-container>

        <ng-container matColumnDef="info">
          <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Details </th>
          <td mat-cell *matCellDef="let schedule" class="info-column">
            <button mat-icon-button (click)="showMoreInfo(schedule)">
              <mat-icon style="color: green;">keyboard_arrow_right</mat-icon>
            </button>
          </td>
        </ng-container>

        <tr mat-header-row *matHeaderRowDef="displayedColumns; sticky: true" [ngClass]="{'hide-header': isWidget}"></tr>
        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
      </table>
    </div>
  `,
  styleUrls: ['./activity-table.component.css']
})
export class ActivityTableComponent implements AfterViewInit {
  @Input() isWidget: boolean = false;
  @Input() size: string = "500px";
  displayedColumns = ['trainId', 'departure', 'arrival', 'lastLocation', 'freight', 'status', 'info'];
  dataSource = new MatTableDataSource(SCHEDULE_DATA);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router) {
    this.dataSource.filterPredicate = (data: TrainSchedule, filter: string) => {
      const lowerCaseFilter = filter.toLowerCase();
      return (
        data.trainId.toLowerCase().includes(lowerCaseFilter) ||
        data.departure.location.toLowerCase().includes(lowerCaseFilter) ||
        data.arrival.location.toLowerCase().includes(lowerCaseFilter) ||
        data.lastLocation.location.toLowerCase().includes(lowerCaseFilter) ||
        data.freight.some(freightItem => freightItem.toLowerCase().includes(lowerCaseFilter)) ||
        data.status.toLowerCase().includes(lowerCaseFilter)
      );
    };
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    if(this.isWidget){
      this.displayedColumns = [
        ...this.displayedColumns.slice(0, 3),
        ...this.displayedColumns.slice(4)
      ];
    }
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showMoreInfo(schedule: TrainSchedule) {
    console.log(schedule.trainId);
    this.router.navigate(['/train-details', schedule.trainId]);
  }
}


export interface TrainSchedule {
  trainId: string;
  departure: {
    location: string;
    time: Date;
  };
  arrival: {
    location: string;
    time: Date;
  };
  lastLocation: {
    [x: string]: any;
    location: string;
    lastUpdated: Date; // New field for the last updated time
  };
  freight: string[]; // Array to handle multiple cargo
  status: string;
}


export const SCHEDULE_DATA: TrainSchedule[] = [
  {
    trainId: 'A123',
    departure: {
      location: 'New York',
      time: new Date('2024-08-19T08:30:00')
    },
    arrival: {
      location: 'Los Angeles',
      time: new Date('2024-08-20T17:45:00')
    },
    lastLocation: {
      location: 'Chicago',
      lastUpdated: new Date('2024-08-19T12:00:00')
    },
    freight: ['Coal', 'Iron'],
    status: 'On Time'
  },
  {
    trainId: 'B456',
    departure: {
      location: 'Miami',
      time: new Date('2024-08-19T09:00:00')
    },
    arrival: {
      location: 'Dallas',
      time: new Date('2024-08-19T22:30:00')
    },
    lastLocation: {
      location: 'Houston',
      lastUpdated: new Date('2024-08-19T15:00:00')
    },
    freight: ['Automobiles'],
    status: 'Delayed'
  },
  {
    trainId: 'C789',
    departure: {
      location: 'San Francisco',
      time: new Date('2024-08-19T10:00:00')
    },
    arrival: {
      location: 'Seattle',
      time: new Date('2024-08-19T18:00:00')
    },
    lastLocation: {
      location: 'Portland',
      lastUpdated: new Date('2024-08-19T14:30:00')
    },
    freight: [],
    status: 'On Time'
  },
  {
    trainId: 'D101',
    departure: {
      location: 'Boston',
      time: new Date('2024-08-19T06:15:00')
    },
    arrival: {
      location: 'Philadelphia',
      time: new Date('2024-08-19T12:45:00')
    },
    lastLocation: {
      location: 'New Haven',
      lastUpdated: new Date('2024-08-19T11:00:00')
    },
    freight: ['Machinery', 'Furniture'],
    status: 'On Time'
  },
  {
    trainId: 'E202',
    departure: {
      location: 'Denver',
      time: new Date('2024-08-19T11:00:00')
    },
    arrival: {
      location: 'Las Vegas',
      time: new Date('2024-08-19T19:30:00')
    },
    lastLocation: {
      location: 'Salt Lake City',
      lastUpdated: new Date('2024-08-19T16:30:00')
    },
    freight: ['Electronics'],
    status: 'On Time'
  },
  {
    trainId: 'F303',
    departure: {
      location: 'Atlanta',
      time: new Date('2024-08-19T05:30:00')
    },
    arrival: {
      location: 'Nashville',
      time: new Date('2024-08-19T13:00:00')
    },
    lastLocation: {
      location: 'Chattanooga',
      lastUpdated: new Date('2024-08-19T10:30:00')
    },
    freight: ['Textiles'],
    status: 'Canceled'
  },
  {
    trainId: 'G404',
    departure: {
      location: 'Phoenix',
      time: new Date('2024-08-19T07:00:00')
    },
    arrival: {
      location: 'San Diego',
      time: new Date('2024-08-19T15:45:00')
    },
    lastLocation: {
      location: 'Yuma',
      lastUpdated: new Date('2024-08-19T13:15:00')
    },
    freight: ['Agricultural Products'],
    status: 'Canceled'
  },
  {
    trainId: 'H505',
    departure: {
      location: 'Detroit',
      time: new Date('2024-08-19T12:00:00')
    },
    arrival: {
      location: 'Cleveland',
      time: new Date('2024-08-19T16:30:00')
    },
    lastLocation: {
      location: 'Toledo',
      lastUpdated: new Date('2024-08-19T14:00:00')
    },
    freight: ['Automobile Parts'],
    status: 'On Time'
  },
  {
    trainId: 'I606',
    departure: {
      location: 'Minneapolis',
      time: new Date('2024-08-19T09:30:00')
    },
    arrival: {
      location: 'Milwaukee',
      time: new Date('2024-08-19T14:00:00')
    },
    lastLocation: {
      location: 'Madison',
      lastUpdated: new Date('2024-08-19T11:30:00')
    },
    freight: [],
    status: 'On Time'
  },
  {
    trainId: 'J707',
    departure: {
      location: 'St. Louis',
      time: new Date('2024-08-19T06:45:00')
    },
    arrival: {
      location: 'Memphis',
      time: new Date('2024-08-19T12:15:00')
    },
    lastLocation: {
      location: 'Cairo',
      lastUpdated: new Date('2024-08-19T10:00:00')
    },
    freight: ['Furniture'],
    status: 'On Time'
  },
  {
    trainId: 'K808',
    departure: {
      location: 'Kansas City',
      time: new Date('2024-08-19T08:00:00')
    },
    arrival: {
      location: 'Oklahoma City',
      time: new Date('2024-08-19T13:30:00')
    },
    lastLocation: {
      location: 'Wichita',
      lastUpdated: new Date('2024-08-19T11:00:00')
    },
    freight: ['Grain', 'Livestock'],
    status: 'Delayed'
  },
  {
    trainId: 'L909',
    departure: {
      location: 'Charlotte',
      time: new Date('2024-08-19T07:15:00')
    },
    arrival: {
      location: 'Raleigh',
      time: new Date('2024-08-19T10:45:00')
    },
    lastLocation: {
      location: 'Greensboro',
      lastUpdated: new Date('2024-08-19T09:00:00')
    },
    freight: [],
    status: 'Canceled'
  }
];


