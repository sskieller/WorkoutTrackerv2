import { WorkoutActivityInterface } from './';

export interface WorkoutProgramInterface {
  _id: number;
  name: string;
  description: string;
  exercises: [WorkoutExerciseInterface];
  activities: [WorkoutActivityInterface];
}

export interface WorkoutExerciseInterface {
  _id: number;
  name: string;
  description: string;
  sets: number;
  repstime: string;
}
