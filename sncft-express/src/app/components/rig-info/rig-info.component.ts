import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FleetService } from '../../services/fleet.service';

@Component({
  selector: 'app-rig-info',
  templateUrl: './rig-info.component.html',
  styleUrls: ['./rig-info.component.css']
})
export class RigInfoComponent implements OnInit {
  rigId: string | null = null;
  rigdata: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private fleetService: FleetService) {}

  ngOnInit(): void {
    // Subscribe to paramMap to detect route changes
    this.route.paramMap.subscribe(params => {
      // Reset the loading state and rigdata when route changes
      this.isLoading = true;
      this.rigdata = {};

      // Fetch the rig ID from the route parameters
      this.rigId = params.get('id');
      
      console.log('Route changed, rigId:', this.rigId);

      // Fetch data based on rigId
      if (this.rigId) {
        this.fleetService.getRig(this.rigId).subscribe(
          (res) => {
            this.rigdata = res;
            this.isLoading = false;
          },
          (error) => {
            console.error('Error fetching rig data:', error);
            this.isLoading = false;
          }
        );
      } else {
        // Handle case where rigId is null or invalid
        this.isLoading = false;
      }
    });
  }
}
