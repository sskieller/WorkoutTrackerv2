import { WorkoutProgram } from '.';

export interface UserGet {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  workoutPrograms: [WorkoutProgram];
}

export class User {
  // tslint:disable-next-line: variable-name
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  workoutPrograms: [WorkoutProgram];
}

export class RegisterUser {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export class LoginUser {
  username: string;
  password: string;
}


export class UserId {
  userId: string;
}
