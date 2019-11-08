import { Component, OnInit } from '@angular/core';
import { RegisterUser, CreateActivity } from 'src/app/shared/components/models';
import { AuthenticationService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-create-workout-activity',
  templateUrl: './create-workout-activity.component.html',
  styleUrls: ['./create-workout-activity.component.scss']
})
export class CreateWorkoutActivityComponent implements OnInit {

  activity: CreateActivity;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.activity = new CreateActivity();
  }

  ngOnInit() {
  }

  registerUser() {
    const url = `/user/login`;
    this.router.navigateByUrl(url);
  }

}
