import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services/workout-program.service';
import { NgForm } from '@angular/forms';
import { IWorkoutProgram, IWorkoutExercise } from 'src/app/shared/components/models/workout-program.model';
import { AuthenticationService } from 'src/app/shared/services';

@Component({
  selector: 'wt-create-workout-program',
  templateUrl: './create-workout-program.component.html',
  styleUrls: ['./create-workout-program.component.scss']
})
export class CreateWorkoutProgramComponent {

  constructor(private workoutProgramService: WorkoutProgramService, private authenticationService: AuthenticationService) {}

  onAddWorkoutProgram(form: NgForm){
    if(form.invalid){
      return;
    }

    const exercise: IWorkoutExercise = {
      name: "Ex1",
      description: "desc1",
      repstime: "10",
      sets: 10
    }

    const workoutProgram: IWorkoutProgram = {
      name: form.value.nameInput,
      description: form.value.descriptionInput,
      exercises: [exercise]
    };
    
    this.workoutProgramService.createWorkoutProgram(this.authenticationService.getUserId(), workoutProgram).subscribe();
    form.resetForm();
  }
}
