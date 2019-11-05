import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login';
import { UserRegistrationComponent } from './user-registration';
import { UserPageComponent } from './user-page';
import {
  WorkoutProgramByIdComponent
  , CreateWorkoutProgramComponent
  , PrivateWorkoutProgramsComponent
  , CreateExerciseComponent
  , WorkoutActivitiesComponent
  , CreateWorkoutActivityComponent
} from './workoutProgram';
import { AuthGuard } from 'src/app/shared/services';

@NgModule({
  // tslint:disable-next-line: max-line-length
  declarations: [
    UserLoginComponent,
    UserRegistrationComponent,
    UserPageComponent,
    // Workout Programs
    WorkoutProgramByIdComponent,
    CreateWorkoutProgramComponent,
    PrivateWorkoutProgramsComponent,
    CreateExerciseComponent,
    // Activities
    WorkoutActivitiesComponent,
    CreateWorkoutActivityComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'new', component: UserRegistrationComponent },
      { path: 'login', component: UserLoginComponent },
      { path: ':userid', component: UserPageComponent},//, canActivate: [AuthGuard] },
      {
        path: ':userid/workoutprogram',
        children: [
          { path: '', component: PrivateWorkoutProgramsComponent },
          { path: 'new', component: CreateWorkoutProgramComponent },
          { path: 'exercise/new', component: CreateExerciseComponent },
          { path: ':workoutprogramid', component: WorkoutProgramByIdComponent },
          {
            path: ':workoutprogramid/workoutactivity',
            children: [
              {path: '', component: WorkoutActivitiesComponent},
              {path: 'new', component: CreateWorkoutActivityComponent}
            ]
          }
        ]
      }
    ])
  ]
})
export class UserModule { }
