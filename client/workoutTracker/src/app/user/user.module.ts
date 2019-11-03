import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { WorkoutProgramComponent } from './workout-program/workout-program.component';
import { WorkoutActivityComponent } from './workout-activity/workout-activity.component';


@NgModule({
  declarations: [UserComponent, WorkoutProgramComponent, WorkoutActivityComponent],
  imports: [
    CommonModule,
    UserRoutingModule
  ]
})
export class UserModule { }
