import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { IWorkoutProgramPrivate } from 'src/app/shared/components/models';

@Component({
  selector: 'wt-private-workout-programs',
  templateUrl: './private-workout-programs.component.html',
  styleUrls: ['./private-workout-programs.component.scss']
})
export class PrivateWorkoutProgramsComponent implements OnInit {
  workoutPrograms$: IWorkoutProgramPrivate[];


  constructor(
    private workoutProgramService: WorkoutProgramService,
    private route: ActivatedRoute
  ) {
  }

  async ngOnInit() {
    console.log('private workout programs init');
    const userId = this.route.snapshot.paramMap.get('userid');
    console.log(userId);

    this.workoutProgramService.getWorkoutProgramsPrivate(userId)
      .subscribe((data: IWorkoutProgramPrivate[]) => {
        console.log(data);
        // this.workoutPrograms$ = data;
        // console.log(this.workoutPrograms$);
      });
  }

}
