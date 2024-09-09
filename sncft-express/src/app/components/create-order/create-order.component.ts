import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OperationFormComponent } from '../operation-form/operation-form.component';

@Component({
  selector: 'app-create-order',
  template: `
    <div class="container">
    <div class="row">
      <div class="col-4">
      <h3 style="font-weight: lighter;">Create new order:</h3>
      <button mat-raised-button style="background-color: green; color:white" (click)="openForm()">new operation</button>
      </div>
    </div>
    </div>
  `,
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent {
  constructor(public dialog: MatDialog){
    
  }
  openForm(){
    this.dialog.open(OperationFormComponent, {
      width: '80vw',
      
      data: {}  // You can pass data to the dialog if needed
    });
  }
  
}
