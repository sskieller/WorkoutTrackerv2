import { WorkoutProgram } from '.';

export class User {
  // tslint:disable-next-line: variable-name
  _id: string;
  firstName: string;
  LastName: string;
  username: string;
  password: string;
  workoutPrograms: [WorkoutProgram];
}
