import { Component ,inject, model, OnInit, signal} from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
import { OperationsService } from '../../services/operations.service';
import { OperationDetail } from '../../services/operations';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';
@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
  styleUrl: './operation-info.component.css'
})
export class OperationInfoComponent implements OnInit{


  reoute:ActivatedRoute=inject(ActivatedRoute);
  operationId=0;
  operationDetail!:OperationDetail;
  isLoading:boolean =true;

  constructor(private router:Router, private operationsService:OperationsService, public dialog: MatDialog){
    this.operationId=Number(this.reoute.snapshot.params["OpId"]);
  }
  navigateToOperations() {
    this.router.navigate(['/operations']);
  }

  ngOnInit() {
    this.operationsService.getOperation(this.operationId).subscribe((res)=>{
      this.operationDetail=res;
      this.isLoading=false;
    },
    (error) => {
      console.error('Error fetching operation:', error);
      this.isLoading = false; // Stop the spinner even if there’s an error
    }
      
    )
  }
  formatDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleString();
  }

  dropOperation(id:number) {
    this.dialog.open(DialogBoxComponent, {
      width: '500px',
      data: {id:id}  // You can pass data to the dialog if needed
    });
    }

 

  
}

