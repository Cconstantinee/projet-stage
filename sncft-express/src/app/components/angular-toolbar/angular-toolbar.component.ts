import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-toolbar',
  template: `
    <mat-toolbar color="primary">
    
    <a routerLink="" class="normal-text-link"><span>SNCFTexpress</span></a>
    <a mat-button routerLink="login">login<span><mat-icon>account_circle</mat-icon></span></a>
  </mat-toolbar>
  `,
  styleUrl: './angular-toolbar.component.css'
})
export class AngularToolbarComponent {

}
