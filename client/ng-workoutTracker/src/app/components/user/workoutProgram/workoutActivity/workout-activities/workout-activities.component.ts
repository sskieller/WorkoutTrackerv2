import { Component, OnInit } from '@angular/core';
import { IWorkoutProgram, IWorkoutProgramActivities } from 'src/app/shared/components/models';
import { WorkoutActivityService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'wt-workout-activities',
  templateUrl: './workout-activities.component.html',
  styleUrls: ['./workout-activities.component.scss']
})
export class WorkoutActivitiesComponent implements OnInit {
  workoutActivities$: IWorkoutProgramActivities
  userId: string;
  wpId: string;

  constructor(
    private workoutActivityService: WorkoutActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.wpId = this.route.snapshot.paramMap.get('workoutprogramid');


    this.workoutActivityService.getWorkoutActivities(this.userId, this.wpId)
      .subscribe((data: any) => {
        this.workoutActivities$ = data;
        console.log(data);
      } )
  }

  gotoCreateActivity() {
    this.router.navigateByUrl(`user/${this.userId}/workoutprogram/${this.wpId}/workoutactivity/new`);
  }

}
