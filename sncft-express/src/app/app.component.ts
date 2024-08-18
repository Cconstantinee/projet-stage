import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  selectedTabIndex = 0;
  title = 'sncft-express';
  currentRoute: string | undefined;
  constructor(private router:Router,private activatedRoute: ActivatedRoute){
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
