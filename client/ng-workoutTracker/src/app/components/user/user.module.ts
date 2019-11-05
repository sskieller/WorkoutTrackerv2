import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateWorkoutProgramsComponent } from './workoutProgram/private-workout-programs/private-workout-programs.component';
import { CreateExerciseComponent } from './workoutProgram/create-exercise/create-exercise.component';
import { WorkoutActivitiesComponent } from './workoutProgram/workoutActivity/workout-activities/workout-activities.component';
import { CreateWorkoutActivityComponent } from './workoutProgram/workoutActivity/create-workout-activity/create-workout-activity.component';



@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [PrivateWorkoutProgramsComponent, CreateExerciseComponent, WorkoutActivitiesComponent, CreateWorkoutActivityComponent],
  imports: [
    CommonModule
  ]
})
export class UserModule { }
