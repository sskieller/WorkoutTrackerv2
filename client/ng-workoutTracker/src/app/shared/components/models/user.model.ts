import { WorkoutProgram } from '.';

export class User {
  // tslint:disable-next-line: variable-name
  _id: string;
  name: {
    firstName: string;
    lastName: string;
  };
  username: string;
  password: string;
  workoutPrograms: [WorkoutProgram];
}

export class RegisterUser {
  name: {
    firstName: string;
    lastName: string;
  };
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
