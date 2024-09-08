import { Component,AfterViewInit, ViewChild, Input, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { OperationsService } from '../../services/operations.service';
import { Operation } from '../../services/operations';
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
<mat-progress-bar *ngIf="isLoading" mode="indeterminate"></mat-progress-bar>
  <div class="example-container" [style.height]="size" [ngClass]="{'no-scrollbar': isWidget}">
    
  <table mat-table [dataSource]="dataSource" matSort class="mat-elevation-z8">

    <!-- Position Column -->
    <ng-container matColumnDef="OpId">
      <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Op Id. </th>
      <td mat-cell *matCellDef="let schedule"> {{schedule.operationId}} </td>
    </ng-container>

    <!-- Name Column -->
    <ng-container matColumnDef="departure">
      <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Departure </th>
      <td mat-cell *matCellDef="let schedule">
      {{schedule.departure.location}}<br>
    <span style="color: gray;">{{schedule.departure.time | date:'short'}}</span>
  </td>
    </ng-container>

    <!-- Weight Column -->
    <ng-container matColumnDef="arrival">
      <th mat-header-cell *matHeaderCellDef [ngClass]="{'hide-header': isWidget}"> Arrival </th>
      <td mat-cell *matCellDef="let schedule">
      {{schedule.arrival.location}}<br>
    <span style="color: gray;">{{schedule.arrival.time | date:'short'}}</span>
  </td>
    </ng-container>

    <!-- Symbol Column -->
    <ng-container matColumnDef="freight">
  <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Freight </th>
  <td mat-cell *matCellDef="let schedule">
    <span *ngIf="schedule.freight && schedule.freight.length > 0; else emptyText">
      {{ schedule.freight }}
    </span>
    <ng-template #emptyText>
      <span style="color: gray;">-no freight-</span>
    </ng-template>
  </td>
</ng-container>


<ng-container matColumnDef="status">
  <th mat-header-cell *matHeaderCellDef mat-sort-header [ngClass]="{'hide-header': isWidget}"> Status </th>
  <td mat-cell *matCellDef="let schedule">
    <div class="status-cell" [ngClass]="getStatusClass(schedule.status)">
      {{ schedule.status }}
    </div>
  </td>
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
export class SchedulesTableComponent implements OnInit {
  @Input() isWidget: boolean = false;
  @Input() size: string = "500px";
  displayedColumns = ['OpId', 'departure', 'arrival', 'freight', 'status', 'info'];
  dataSource = new MatTableDataSource<Operation>([]);
  @ViewChild(MatSort) sort!: MatSort;

  isLoading: boolean = true;

  constructor(
    private router: Router, 
    private operationsService: OperationsService
  ) {}

  ngOnInit() {
    this.operationsService.getAllOperations().subscribe(
      (res: Operation[]) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching operations:', error);
        this.isLoading = false;
      }
    );
  }

  applyFilter(event: Event) {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  showMoreInfo(schedule: Operation) {
    console.log(schedule.operationId);
    this.router.navigate(['/op-details', schedule.operationId]);
  }

  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'on route':
        return 'status-on-route';
      case 'delayed':
        return 'status-delayed';
      case 'stopped':
        return 'status-stopped';
      case 'arrived':
        return 'status-arrived';
      case 'pending':
        return 'status-pending';
      default:
        return '';
    }
  }
}





