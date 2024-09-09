import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { StorageServiceService } from './services/storage-service.service';
import { LocationsService } from './services/locations.service';
import { FreightService } from './services/freight.service';
import { FleetService } from './services/fleet.service';
import { OperationsService } from './services/operations.service';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }), // Starting styles
        animate('500ms ease-out', style({ transform: 'translateY(-10%)', opacity: 0 })) // End styles with fade-out
      ])
    ])
  ]
})

export class AppComponent {
  operations_status:string="pending"
  locations_status:string="pending"
  fleet_status:string="pending"
  freight_status:string="pending"

  
  selectedTabIndex = 0;
  title = 'sncft-express';
  currentRoute: string | undefined;
  constructor(private router:Router,private activatedRoute: ActivatedRoute, private storageService:StorageServiceService,private locationsService:LocationsService,
    private freightService:FreightService,private fleetService:FleetService,private operationsService:OperationsService
  ){
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    })
  }

  onTabChange(event: MatTabChangeEvent) {
    const selectedTabLabel = event.tab.textLabel.toLowerCase(); // Convert label to lower case to match route
    var route = `/${selectedTabLabel}`;
    console.log(route);
    // Validate and navigate to the constructed route
    if (selectedTabLabel==="home"){
      route='';
      this.router.navigate([route]);
    }
    else{
      if (['dashboard', 'operations', 'fleet', 'map','freight'].includes(selectedTabLabel)) {
        this.router.navigate([route]);
      } else {
        this.router.navigate(['']); // Fallback route
      }
    }
    }
    ngOnInit(): void {
      // Subscribe to router events
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.updateSelectedTab(event.urlAfterRedirects);
        }
      });
      this.storageService.setItem('active_operations_tab', 'trackerTable');
      this.locationsService.getLocations().subscribe(
        (res)=>{console.log('locations ready');
          this.locations_status="ready";
        },
        (error)=>{console.log(error);
          this.locations_status="error";
        }
      );
      this.freightService.getFreightTypes().subscribe(
        (res)=>{console.log('freight ready');
          this.freight_status="ready";
        },
        (error)=>{console.log(error);
          this.freight_status="error";
        }
      );
      this.fleetService.getHoleFleet().subscribe(
        (res)=>{console.log('fleet ready');
          this.fleet_status="ready";
        },
        (error)=>{console.log(error);
          this.fleet_status="error";
        }
      );
      this.operationsService.getAllOperations().subscribe(
        (res)=>{console.log('operations ready');
          this.operations_status="ready";
        },
        (error)=>{console.log(error);
          this.operations_status="error";
        }
      )
    }
    
    updateSelectedTab(url: string): void {
      if (url.includes('/dashboard')) {
        this.selectedTabIndex = 0;
      } else if (url.includes('/operations')) {
        this.selectedTabIndex = 1;
      } else if (url.includes('/fleet')) {
        this.selectedTabIndex = 2;
      } else if (url.includes('/freight')) {
        this.selectedTabIndex = 3;
      } else if (url.includes('/map')) {
        this.selectedTabIndex = 4;
      }
    }
    

}
