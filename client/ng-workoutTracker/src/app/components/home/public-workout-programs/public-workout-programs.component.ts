import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutProgramPublicService } from 'src/app/shared/services';
import { WorkoutProgramPublic } from 'src/app/shared/components/models/workout-program.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wt-public-workout-programs',
  templateUrl: './public-workout-programs.component.html',
  styleUrls: ['./public-workout-programs.component.scss']
})
export class PublicWorkoutProgramsComponent implements OnInit {
  
  workoutPrograms: WorkoutProgramPublic[] = [{name:"TestProgramName", description:"TestDescription"}];
  workoutProgramsSubscription: Subscription;

  constructor(private workoutService: WorkoutProgramPublicService) { }

  ngOnInit() {
    this.workoutService.getWorkoutProgramsPublic();

    this.workoutProgramsSubscription = this.workoutService.getWorkoutProgramsPublic()
    .subscribe((programs: WorkoutProgramPublic[]) => {
      this.workoutPrograms = programs;
    });
  }
}
