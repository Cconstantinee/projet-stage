import { Component, OnInit, signal } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent implements OnInit {
  
  selectedValue = '';
  constructor(private storageService:StorageServiceService){

  }
  ngOnInit(): void {
    this.selectedValue = this.storageService.getItem('active_operations_tab');
  }
  updateLocalStorage() {
    this.storageService.setItem('active_operations_tab', this.selectedValue);
    }

}
