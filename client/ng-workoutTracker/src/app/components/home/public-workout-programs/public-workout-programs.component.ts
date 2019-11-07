import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutProgramPublicService } from 'src/app/shared/services';
import { WorkoutProgramPublic } from 'src/app/shared/components/models/workout-program.model';
import { Subscription } from 'rxjs';
import { debug } from 'util';

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
    this.workoutProgramsSubscription = this.workoutService.getWorkoutProgramsPublic()
    .subscribe((programs: WorkoutProgramPublic[]) => {
      
      console.log('all workout programs: ' + programs);
      
      this.workoutPrograms = programs;
    });
  }

  ngOnDestroy(): void{
    this.workoutProgramsSubscription.unsubscribe();
  }
}
