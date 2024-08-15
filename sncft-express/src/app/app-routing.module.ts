import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SchedulesComponent } from './pages/schedules/schedules.component';
import { FleetComponent } from './pages/fleet/fleet.component';

const routes: Routes = [
  {path:'',component:HomeComponent,title:'home'},
  {path:'dashboard',component:DashboardComponent},
  {path:'schedules',component:SchedulesComponent,title:'home'},
  {path:'fleet',component:FleetComponent,title:'fleet'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
