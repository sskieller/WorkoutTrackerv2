import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkoutProgramPrivate } from 'src/app/shared/components/models';

@Component({
  selector: 'wt-private-workout-programs',
  templateUrl: './private-workout-programs.component.html',
  styleUrls: ['./private-workout-programs.component.scss']
})
export class PrivateWorkoutProgramsComponent implements OnInit {
  workoutPrograms$: IWorkoutProgramPrivate[];

  userId: string;

  workoutPrograms: IWorkoutProgramPrivate[];
  convPrograms: any[];

  constructor(
    private workoutProgramService: WorkoutProgramService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');

    this.workoutProgramService.getWorkoutProgramsPrivate(this.userId)
      .subscribe((data: any) => {
        this.workoutPrograms$ = data;
        this.convPrograms = Object.keys(data).map(key => ({type: key, value: data[key]}));
      });
  }

  gotoWorkoutProgram(programId) {
    this.router.navigateByUrl(`/user/${this.userId}/workoutprogram/${programId}`);
  }
}
