import { Component, OnInit } from '@angular/core';
import { UserService, WorkoutProgramPublicService } from 'src/app/shared/services';
import { User, LoginUser, WorkoutProgramPublic } from 'src/app/shared/components/models';

@Component({
  selector: 'wt-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  user: LoginUser;
  programs: WorkoutProgramPublic[];
  constructor(private userService: UserService, 
    private workoutProgramPublicService: WorkoutProgramPublicService) { }

  getUser(id: string): void {
    this.userService.getUser(id)
      .subscribe(user => this.user = user);


    console.log(this.user);
  }

  getWorkoutProgramsPublic(): void {
    this.workoutProgramPublicService.getWorkoutProgramsPublic()
      .subscribe(programs => this.programs = programs);

    console.log(this.programs);
  }

  ngOnInit() {
    
  }

}
