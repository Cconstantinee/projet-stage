import { Component ,inject} from '@angular/core';
import { ActivatedRoute ,Router} from '@angular/router';
@Component({
  selector: 'app-operation-info',
  templateUrl: './operation-info.component.html',
  styleUrl: './operation-info.component.css'
})
export class OperationInfoComponent {
  reoute:ActivatedRoute=inject(ActivatedRoute);
  operationId=0;
  constructor(private router:Router){
    this.operationId=Number(this.reoute.snapshot.params["OpId"]);
  }
  navigateToOperations() {
    this.router.navigate(['/operations']);
  }
}
