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
import {MatTableModule} from '@angular/material/table';
import { SchedulesTableComponent } from './components/schedules-table/schedules-table.component';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { ActivityTableComponent } from './components/activity-table/activity-table.component';
import { OperationInfoComponent } from './components/operation-info/operation-info.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import { FilterTableComponent } from './components/filter-table/filter-table.component';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { TrainInfoComponent } from './components/train-info/train-info.component'; 
import {MatGridListModule} from '@angular/material/grid-list';
import { WidgetComponent } from './components/widget/widget.component';
import {MatCardModule} from '@angular/material/card';
import { InteractiveMap1Component } from './components/interactive-map-1/interactive-map-1.component';
import { LoginComponent } from './pages/login/login.component'; 
import { HttpClientModule } from '@angular/common/http';
import {MatProgressBarModule} from '@angular/material/progress-bar'; 
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DataWidgetComponent } from './components/data-widget/data-widget.component'; 
import {MatRippleModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import { RigInfoComponent } from './components/rig-info/rig-info.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import {MatSnackBarModule} from '@angular/material/snack-bar'; 
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
    SchedulesComponent,
    FleetComponent,
    AngularToolbarComponent,
    MapComponent,
    FreightComponent,
    SchedulesTableComponent,
    ActivityTableComponent,
    OperationInfoComponent,
    TrainInfoComponent,
    WidgetComponent,
    InteractiveMap1Component,
    LoginComponent,
    DataWidgetComponent,
    RigInfoComponent,
    DialogBoxComponent
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatInputModule,
    MatTabsModule,
    MatButtonModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonToggleModule,
    FormsModule,
    MatDividerModule,
    MatExpansionModule,
    MatSelectModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FilterTableComponent,
    MatGridListModule,
    MatCardModule,
    HttpClientModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRippleModule,
    MatChipsModule,
    MatDialogModule,
    MatSnackBarModule
],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
