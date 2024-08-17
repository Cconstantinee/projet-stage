import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { FleetComponent } from './pages/fleet/fleet.component';
import { MapComponent } from './pages/map/map.component';
import { FreightComponent } from './pages/freight/freight.component';

const routes: Routes = [
  {path:'',component:HomeComponent,title:'home'},
  {path:'dashboard',component:DashboardComponent},
  {path:'operations',component:SchedulesComponent,title:'operations'},
  {path:'fleet',component:FleetComponent,title:'fleet'},
  {path:'map',component:MapComponent,title:'map'},
  {path:'freight',component:FreightComponent,title:'freight'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
