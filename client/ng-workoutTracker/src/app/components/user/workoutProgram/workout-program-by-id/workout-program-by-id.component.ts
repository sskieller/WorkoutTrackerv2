import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkoutProgramPrivate } from 'src/app/shared/components/models';

@Component({
  selector: 'wt-workout-program-by-id',
  templateUrl: './workout-program-by-id.component.html',
  styleUrls: ['./workout-program-by-id.component.scss']
})
export class WorkoutProgramByIdComponent implements OnInit {
  userId: string;
  workoutProgramId: string;
  workoutProgram$: IWorkoutProgramPrivate;
  convWorkoutProgram: any;

  constructor(
    private workoutProgramService: WorkoutProgramService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.workoutProgramId = this.route.snapshot.paramMap.get('workoutprogramid');

    this.workoutProgramService.getWorkoutProgramById(this.userId, this.workoutProgramId)
      .subscribe((data: any) => {
        this.workoutProgram$ = data;
        console.log(data);
        this.convWorkoutProgram = Object.keys(data).map(key => ({ type: key, value: data[key] }));
      });
  }

  gotoCreateActivity() {
    this.router.navigateByUrl(`user/${this.userId}/workoutprogram/${this.workoutProgramId}/workoutactivity/new`);
  }

  gotoActivities() {
    this.router.navigateByUrl(`user/${this.userId}/workoutprogram/${this.workoutProgramId}/workoutactivity`);
  }
}
