import { Component, OnInit, signal, ViewChild } from '@angular/core';
import { StorageServiceService } from '../../services/storage-service.service';
import { SchedulesTableComponent } from '../../components/schedules-table/schedules-table.component';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrl: './schedules.component.css'
})
export class SchedulesComponent implements OnInit {

  @ViewChild('scheduleTable') scheduleTableComponent!: SchedulesTableComponent;
handleEvent(event: any) {
  console.log('event caught' ,event);
  
  
  switch (event) {
    case 'update pending':
        this.scheduleTableComponent.isLoading=true;
      break;
      case 'update complete':
        this.scheduleTableComponent.ngOnInit();
        this.scheduleTableComponent.isLoading=false;
        console.log('component reloaded')
      break;
  
    default:
      break;
  }
}
  
  selectedValue = '';
  constructor(private storageService:StorageServiceService){

  }
  ngOnInit(): void {
    this.selectedValue = this.storageService.getItem('active_operations_tab');
    this.scheduleTableComponent.ngOnInit();
  }
  updateLocalStorage() {
    this.storageService.setItem('active_operations_tab', this.selectedValue);
    }

}
