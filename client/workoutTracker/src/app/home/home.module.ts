import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';

import { HomeComponent } from './home/home.component';
import { WorkoutProgramComponent } from './workout-program/workout-program.component';

const routes: Route[] = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'workoutProgram', component: WorkoutProgramComponent} // public workout program overview
];

@NgModule({
  declarations: [HomeComponent,
    WorkoutProgramComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FlexLayoutModule,
    MatGridListModule,
    MatTabsModule
  ]
})
export class HomeModule { }
