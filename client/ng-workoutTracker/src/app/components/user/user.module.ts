import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLoginComponent } from './user-login';
import { UserRegistrationComponent } from './user-registration';
import { UserPageComponent } from './user-page';
import { WorkoutProgramByIdComponent
  , CreateWorkoutProgramComponent
  , PrivateWorkoutProgramsComponent
  , CreateExerciseComponent,
  WorkoutActivitiesComponent,
  CreateWorkoutActivityComponent} from './workoutProgram';




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
      {path: '', pathMatch: 'full', redirectTo: 'login'},
      {path: 'new', component: UserRegistrationComponent},
      {path: 'login', component: UserLoginComponent},
      {path: ':userId', component: UserPageComponent}
    ])
  ]
})
export class UserModule { }
