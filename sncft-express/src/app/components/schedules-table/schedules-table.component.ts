import { Component,AfterViewInit, ViewChild, Input } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OperationsService } from '../../services/operations.service';

@Component({
  selector: 'app-schedules-table',
  template: `
    <!-- start of the table ---------------------------------->
  <mat-form-field appearance="fill" *ngIf="isWidget==false">
  
  <input matInput (keyup)="applyFilter($event)" placeholder="Search">
  <button mat-icon-button matSuffix disabled>
    <mat-icon>search</mat-icon>
  </button>
</mat-form-field>
  <div class="example-container" [style.height]="size" [ngClass]="{'no-scrollbar': isWidget}">
    
  <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">

    <!-- Position Column -->
    <ng-container matColumnDef="OpId">
      <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Op Id. </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.OpId}} </td>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="departure">
      <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Departure </th>
      <td mat-cell *matCellDef="let schedule">
      {{schedule.departure_location}}<br>
    <span style="color: gray;">{{schedule.departure_time | date:'short'}}</span>
  </td>
    </ng-container>

    <!-- Weight Column -->
    <ng-container matColumnDef="arrival">
      <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Arrival </th>
      <td mat-cell *matCellDef="let schedule">
      {{schedule.arrival_location}}<br>
    <span style="color: gray;">{{schedule.arrival_time | date:'short'}}</span>
  </td>
    </ng-container>

    <!-- Symbol Column -->
    <ng-container matColumnDef="freight">
      <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Freight </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.freight}} </td>
    </ng-container>

    <ng-container matColumnDef="status">
      <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Status </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.status}} </td>
    </ng-container>

    <ng-container matColumnDef="info">
      <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> details </th>
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
  styleUrl: './schedules-table.component.css'
})
export class SchedulesTableComponent implements AfterViewInit {
  @Input() isWidget: boolean = false;
  @Input() size: string = "500px";
  displayedColumns = ['OpId','departure', 'arrival', 'freight', 'status', 'info'];
  dataSource = new MatTableDataSource<SchedulesTable>([]); // Initialize with empty array
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private operationsService: OperationsService) {}

  ngAfterViewInit() {
    this.operationsService.getAllOperations().subscribe(
      (res: any) => {
        // Map the response data to SchedulesTable format
        const mappedData: SchedulesTable[] = res.map((item: any) => ({
          OpId: item.operation_id,
          departure_location: item.schedule.departure_location,
          departure_time: new Date(item.schedule.departure_time),
          arrival_location: item.schedule.arrival_location,
          arrival_time: new Date(item.schedule.arrival_time),
          freight: item.freight.map((f: any) => f.freight_type), // Collect freight types into an array
          status: item.status
        }));
        
        this.dataSource.data = mappedData;
        this.dataSource.sort = this.sort; // Set the sort after data is assigned
      },
      error => {
        console.error('Error fetching operations:', error);
      }
    );
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showMoreInfo(schedule: SchedulesTable) {
    console.log(schedule.OpId);
    this.router.navigate(['/op-details', schedule.OpId]);
  }
}

export interface SchedulesTable {
  OpId:number;
  departure_location:string;
  departure_time:Date;
  arrival_location:string;
  arrival_time:Date;
  freight:String[];
  status:string;

}



