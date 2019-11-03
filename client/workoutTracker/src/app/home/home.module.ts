import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { WorkoutProgramComponent } from './workout-program/workout-program.component';



@NgModule({
  declarations: [HomeComponent, WorkoutProgramComponent],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
