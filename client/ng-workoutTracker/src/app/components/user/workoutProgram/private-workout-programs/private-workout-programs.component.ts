import { Component, OnInit } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkoutProgramPrivate } from 'src/app/shared/components/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wt-private-workout-programs',
  templateUrl: './private-workout-programs.component.html',
  styleUrls: ['./private-workout-programs.component.scss']
})
export class PrivateWorkoutProgramsComponent implements OnInit {
  workoutPrograms$: IWorkoutProgramPrivate[] =
    [{
      name: 'testname',
      description: 'test description',
      exercises:
        [{
          name: 'testex name',
          description: 'testex desc',
          sets: 3,
          repstime: '2 sec'
        }],
      activities: [{
        name: 'name',
        description: 'desc',
        woActivities:
          [{
            name: 'ac name',
            description: 'ac desc',
            sets: 4,
            repstime: 'ac repstime'
          }]
      }]
    }];

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
