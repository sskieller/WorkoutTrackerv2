import { Component, OnInit } from '@angular/core';
import { WorkoutProgramPublicService } from 'src/app/shared/services';
import { IWorkoutProgramPublic } from 'src/app/shared/components/models';

@Component({
  selector: 'wt-public-workout-programs',
  templateUrl: './public-workout-programs.component.html',
  styleUrls: ['./public-workout-programs.component.scss']
})
export class PublicWorkoutProgramsComponent implements OnInit {
workoutProgramsPublic$: IWorkoutProgramPublic[];


  constructor(
    private workoutProgramPublicService: WorkoutProgramPublicService
  ) { }

  async ngOnInit() {

    this.workoutProgramPublicService.getWorkoutProgramsPublic()
    .subscribe((data: IWorkoutProgramPublic[]) => {
      this.workoutProgramsPublic$ = data;
    });
  }
}
