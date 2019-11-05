import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PublicWorkoutProgramsComponent } from './public-workout-programs/public-workout-programs.component';



@NgModule({
  declarations: [HomeComponent, PublicWorkoutProgramsComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
