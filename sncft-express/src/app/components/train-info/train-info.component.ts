import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-train-info',
  templateUrl: './train-info.component.html',
  styleUrl: './train-info.component.css'
})
export class TrainInfoComponent {
  reoute:ActivatedRoute=inject(ActivatedRoute);
  trainId="";
  constructor(private router:Router){
    this.trainId=String(this.reoute.snapshot.params["trainId"]);
  }
  navigateToOperations() {
    this.router.navigate(['/operations']);
  }
}
