import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {

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

}
