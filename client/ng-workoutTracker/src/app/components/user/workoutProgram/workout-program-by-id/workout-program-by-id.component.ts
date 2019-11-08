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
    .subscribe((exercises: any) => {
      this.workoutProgram$.exercises = exercises;
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

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
// ];

