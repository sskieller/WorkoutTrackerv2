import { WorkoutActivityInterface, WorkoutProgramInterface } from './';

export interface WorkoutProgramPublicInterface {
  _id: number;
  name: string;
  description: string;
  exercises: [WorkoutProgramInterface];
  activities: [WorkoutActivityInterface];
}
