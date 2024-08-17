import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularToolbarComponent } from './components/angular-toolbar/angular-toolbar.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import { MapComponent } from './pages/map/map.component';
import { FreightComponent } from './pages/freight/freight.component';
import {MatButtonModule} from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SchedulesComponent,
    FleetComponent,
    AngularToolbarComponent,
    MapComponent,
    FreightComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
