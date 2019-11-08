import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services/workout-program.service';
import { NgForm } from '@angular/forms';
import { IWorkoutProgram, IWorkoutExercise } from 'src/app/shared/components/models/workout-program.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wt-create-workout-program',
  templateUrl: './create-workout-program.component.html',
  styleUrls: ['./create-workout-program.component.scss']
})
export class CreateWorkoutProgramComponent {
  private route: ActivatedRoute;
  private id: String;

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('userid');
  }
  constructor(private workoutProgramService: WorkoutProgramService) {}

  onAddWorkoutProgram(form: NgForm){
    if(form.invalid){
      return;
    }
    const workoutProgram: IWorkoutProgram = {
      name: form.value.nameInput,
      description: form.value.descriptionInput,
      exercises: [{name:"name1", description: "desc2", sets: 5, repstime: "10"}]
    };
    
    this.workoutProgramService.createWorkoutProgram(this.id, workoutProgram);
    form.resetForm();
  }
}
