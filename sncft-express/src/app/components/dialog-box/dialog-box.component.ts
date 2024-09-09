import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OperationsService } from '../../services/operations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-box',
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.css'
})
export class DialogBoxComponent {
  confirm: string = '';
  id?: number;
  startLoading:boolean=false;
  constructor(private operationsService:OperationsService,private router:Router,
    public dialogRef: MatDialogRef<DialogBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // To receive data passed to the dialog
  ) {
    this.id = data.id; // Assuming the ID is passed to the dialog
  }

  confirmed(): void {
    this.startLoading=true;
    if (this.confirm === 'yes') {
      console.log('Deletion confirmed');
      
        this.operationsService.deleteOperation(this.id).subscribe(
          (res)=>{console.log(res);
          this.operationsService.cachedOperations=null;
          this.startLoading=false;
          this.router.navigate(['/operations']);
          this.dialogRef.close(true);
          },
          (error)=>{console.log(error);
          alert('there was a porblem dropping the operation');
          this.startLoading=false;
          }
        )
      
       // Close dialog and pass true as result
    } else {
      alert('Please type "yes" to confirm.'); // Show alert if not 'yes'
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}

