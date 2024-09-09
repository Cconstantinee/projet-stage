import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  templateUrl: './loading-screen.component.html',
  styleUrl: './loading-screen.component.css',
  
})
export class LoadingScreenComponent {
@Input()  operations_status: string="pending";
@Input()  fleet_status: string="pending";
@Input()  freight_status: string="pending";
@Input()  locations_status: string="pending";
getStatusClass(status: string): string {
  if (status === 'ready') {
    return 'ready';
  } else if (status === 'error') {
    return 'error';
  } else if (status === 'pending') {
    return 'pending';
  }
  return ''; // Default case, if necessary
}
}
