import { Component, OnInit } from '@angular/core';
import { WorkoutProgramPublicService } from 'src/app/shared/services';

@Component({
  selector: 'wt-public-workout-programs',
  templateUrl: './public-workout-programs.component.html',
  styleUrls: ['./public-workout-programs.component.scss']
})
export class PublicWorkoutProgramsComponent implements OnInit {
  
  workoutPrograms: any;

  constructor(private workoutService: WorkoutProgramPublicService) { }

  Q(): void {
    this.workoutPrograms = this.workoutService.getWorkouts();
  }


  

  ngOnInit() {
    this.getWorkouts();
  }

}
