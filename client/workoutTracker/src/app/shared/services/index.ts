import { Provider } from '@angular/core';
import { UserService, HttpUserService } from './user.service';
import { WorkoutProgramPublicService, HttpWorkoutProgramPublicService } from './workout-program-public.service';
import { WorkoutProgramService, HttpWorkoutProgramService } from './workout-program.service';
import { WorkoutActivityService, HttpWorkoutActivityService } from './workout-activity.service';


export { UserInterface, UserService, CreateUserParams, LoginUserParams } from './user.service';
export { WorkoutProgramPublicInterface, WorkoutProgramPublicService } from './workout-program-public.service';
export { WorkoutProgramInterface, WorkoutProgramService,
  CreateWorkoutProgramParams, UpdateWorkoutProgramParams } from './workout-program.service';
export { WorkoutActivityInterface, WorkoutActivityService,
  CreateWorkoutActivityParams, UpdateWorkoutActivityParams } from './workout-activity.service';


export const SHARED_SERVICES: Provider[] = [
  { provide: UserService, useClass: HttpUserService },
  { provide: WorkoutProgramService, useClass: HttpWorkoutProgramService },
  { provide: WorkoutProgramPublicService, useClass: HttpWorkoutProgramPublicService },
  { provide: WorkoutActivityService, useClass: HttpWorkoutActivityService }
];
