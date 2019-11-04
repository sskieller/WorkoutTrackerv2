import { WorkoutProgramInterface } from './';

export interface UserInterface {
  _id: number;
  name: {
    firstName: string,
    lastName: string
  };
  username: string;
  password: string;
  workoutPrograms: [WorkoutProgramInterface];
  token?: string;
}
