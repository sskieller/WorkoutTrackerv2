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
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { AuthGuard } from 'src/app/shared/services';
import { MatListModule } from '@angular/material/list';

const routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'new', component: UserRegistrationComponent },
  { path: 'login', component: UserLoginComponent },
  { path: ':userid', component: UserPageComponent, canActivate: [AuthGuard] },
  {
    path: ':userid/workoutprogram',
    children: [
      { path: '', component: PrivateWorkoutProgramsComponent, canActivate: [AuthGuard] },
      { path: 'new', component: CreateWorkoutProgramComponent, canActivate: [AuthGuard] },
      { path: 'exercise/new', component: CreateExerciseComponent, canActivate: [AuthGuard] },
      { path: ':workoutprogramid', component: WorkoutProgramByIdComponent, canActivate: [AuthGuard] },
      {
        path: ':workoutprogramid/workoutactivity',
        children: [
          { path: '', component: WorkoutActivitiesComponent, canActivate: [AuthGuard] },
          { path: 'new', component: CreateWorkoutActivityComponent, canActivate: [AuthGuard] }
        ]
      }
    ]
  }
];

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
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    RouterModule.forChild(routes),
  ],
})
export class UserModule { }
