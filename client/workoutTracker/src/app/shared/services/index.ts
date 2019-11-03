import { Provider } from '@angular/core';
import { UserService, HttpUserService } from './user.service';
import { WorkoutProgramPublicService, HttpWorkoutProgramPublicService } from './workout-program-public.service';
import {WorkoutProgramService, HttpWorkoutProgramService} from './workout-program.service';



export { UserInterface, UserService, CreateUserParams, LoginUserParams } from './user.service';
export { WorkoutProgramPublicInterface, WorkoutProgramPublicService} from './workout-program-public.service';
export {WorkoutProgramInterface, WorkoutProgramService, CreateWorkoutProgramParams, UpdateWorkoutProgramParams} from './workout-program.service';



