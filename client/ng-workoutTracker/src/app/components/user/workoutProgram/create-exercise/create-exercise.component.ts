import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { WorkoutProgram, WorkoutActivity, WorkoutExercise } from 'src/app/shared/components/models';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wt-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss']
})
export class CreateExerciseComponent implements OnInit {
  private userId;
  private workoutProgramId;


  constructor(private workoutProgramService: WorkoutProgramService,
    private route: ActivatedRoute) { }

  onAddExercise(form: NgForm){
    if (form.invalid) {
      return;
    }

    var workoutProgram: WorkoutProgram = {
      name: "",
      description: "",
      exercises: [{
        name: form.value.name,
        description: form.value.description,
        repstime: form.value.repstime,
        sets: form.value.sets
      }],
      activities: [null]
    };

    console.log(workoutProgram);

    this.workoutProgramService.addExerciseToProgram(this.userId, this.workoutProgramId, workoutProgram).subscribe();
    form.resetForm();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid')
    this.workoutProgramId = this.route.snapshot.paramMap.get('workoutprogramid')
  }
}
