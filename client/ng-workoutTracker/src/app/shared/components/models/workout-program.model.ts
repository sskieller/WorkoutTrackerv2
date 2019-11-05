import { WorkoutActivity } from '.';

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
