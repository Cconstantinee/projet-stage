import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-toolbar',
  template: `
    <mat-toolbar color="primary">
    
    <a routerLink="" class="normal-text-link"><span>SNCFTexpress</span></a>
    <div class="custom-spacer"></div>
    <a mat-button>schedule manifest</a>
    <a mat-button>about</a>
    <a mat-button routerLink="login"> login <mat-icon>account_circle</mat-icon></a>
    
    
  </mat-toolbar>
  `,
  styleUrl: './angular-toolbar.component.css'
})
export class AngularToolbarComponent {

}
