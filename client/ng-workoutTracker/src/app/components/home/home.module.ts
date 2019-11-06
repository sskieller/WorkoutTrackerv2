import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PublicWorkoutProgramsComponent } from './public-workout-programs/public-workout-programs.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [HomeComponent, PublicWorkoutProgramsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    RouterModule.forChild([
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: 'home', component: HomeComponent},
      {path: 'workoutprogram', component: PublicWorkoutProgramsComponent}
    ])
  ]
})
export class HomeModule { }
