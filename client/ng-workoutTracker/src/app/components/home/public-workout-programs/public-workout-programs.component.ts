import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutProgramPublicService } from 'src/app/shared/services';
import { IWorkoutProgramPublic } from 'src/app/shared/components/models/workout-program.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wt-public-workout-programs',
  templateUrl: './public-workout-programs.component.html',
  styleUrls: ['./public-workout-programs.component.scss']
})
export class PublicWorkoutProgramsComponent implements OnInit {
  
  workoutPrograms: IWorkoutProgramPublic[] = [{name:"TestProgramName", description:"TestDescription"}];
  workoutProgramsSubscription: Subscription;

  constructor(private workoutService: WorkoutProgramPublicService) { }

  ngOnInit() {
    this.workoutProgramsSubscription = this.workoutService.getWorkoutProgramsPublic()
    .subscribe((res: any) => {
      this.workoutPrograms = res.programs;
    });
  }

  ngOnDestroy(): void{
    this.workoutProgramsSubscription.unsubscribe();
  }
}
