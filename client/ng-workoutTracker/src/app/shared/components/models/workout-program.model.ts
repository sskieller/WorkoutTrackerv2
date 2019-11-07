import { WorkoutActivity, IWorkoutActivity } from '.';

export class WorkoutProgram {
  name: string;
  description: string;
  exercises: [WorkoutExercise];
  activities: [WorkoutActivity];
}

export class WorkoutExercise {
  name: string;
  description: string;
  sets: number;
  repstime: string;
}

export class WorkoutProgramPublic {
  name: string;
  description: string;
}

export interface IWorkoutProgram {
  name: string;
  description: string;
  exercises: [IWorkoutExercise];
}

export interface IWorkoutProgramPublic {
  name: string;
  description: string;
}

export interface IWorkoutProgramPrivate {
  name: string;
  description: string;
  exercises: [IWorkoutExercise];
  activities: [IWorkoutActivity];
}

export interface IWorkoutExercise {
  name: string;
  description: string;
  sets: number;
  repstime: string;
}
