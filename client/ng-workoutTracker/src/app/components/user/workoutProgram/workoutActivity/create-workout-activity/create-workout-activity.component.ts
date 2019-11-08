import { Component, OnInit } from '@angular/core';
import { RegisterUser, CreateActivity } from 'src/app/shared/components/models';
import { AuthenticationService, WorkoutActivityService } from 'src/app/shared/services';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'wt-create-workout-activity',
  templateUrl: './create-workout-activity.component.html',
  styleUrls: ['./create-workout-activity.component.scss']
})
export class CreateWorkoutActivityComponent implements OnInit {

  newActivity: CreateActivity;
  userId: string;
  wpId: string;


  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private activityService: WorkoutActivityService
  ) {
    this.newActivity = new CreateActivity();
  }

  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.wpId = this.route.snapshot.paramMap.get('workoutprogramid');
  }

  createWorkoutActivity() {
    this.activityService.createWorkoutActivity(this.userId, this.wpId, this.newActivity).subscribe();

    const url = `/user/${this.userId}/workoutprogram/${this.wpId}/workoutactivity`;
    this.router.navigateByUrl(url);
  }
}
