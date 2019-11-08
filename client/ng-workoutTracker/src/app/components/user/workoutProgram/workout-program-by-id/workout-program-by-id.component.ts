import { Component, OnInit, OnDestroy } from '@angular/core';
import { WorkoutProgramService } from 'src/app/shared/services';
import { ActivatedRoute, Router } from '@angular/router';
import { IWorkoutProgramPrivate, IWorkoutExercise } from 'src/app/shared/components/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'wt-workout-program-by-id',
  templateUrl: './workout-program-by-id.component.html',
  styleUrls: ['./workout-program-by-id.component.scss']
})
export class WorkoutProgramByIdComponent implements OnInit, OnDestroy {
  userId: string;
  workoutProgramId: string;
  workoutProgram$: IWorkoutProgramPrivate;
  exercises: IWorkoutExercise[];
  displayedColumns: string[] = ['nameCN', 'descriptionCN', 'repetitionsCN','setsCN'];
  workoutProgramSubscription: Subscription;
  
  convWorkoutProgram: any;

  constructor(
    private workoutProgramService: WorkoutProgramService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  async ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('userid');
    this.workoutProgramId = this.route.snapshot.paramMap.get('workoutprogramid');

    this.workoutProgramSubscription = this.workoutProgramService.getExerciseUpdateListener()
    .subscribe((exercises: IWorkoutExercise[]) => {
      this.exercises = exercises;
    });

    this.workoutProgramService.getWorkoutProgramById(this.userId, this.workoutProgramId)
      .subscribe((data: any) => {

        this.workoutProgram$ = data;
        this.exercises = data.program.exercises;
        console.log(data);
        // this.convWorkoutProgram = Object.keys(data).map(key => ({ type: key, value: data[key] }));
      });
  }

  ngOnDestroy(){
    this.workoutProgramSubscription.unsubscribe();
  }

  gotoCreateActivity() {
    this.router.navigateByUrl(`user/${this.userId}/workoutprogram/${this.workoutProgramId}/workoutactivity/new`);
  }

  gotoActivities() {
    this.router.navigateByUrl(`user/${this.userId}/workoutprogram/${this.workoutProgramId}/workoutactivity`);
  }
}