export class WorkoutActivity {
  name: string;
  description: string;
  woActivities: [woActivity];
}

// tslint:disable-next-line: class-name
export class woActivity {
  name: string;
  description: string;
  sets: number;
  repstime: string;
}

export interface IWorkoutActivity {
  name: string;
  description: string;
  woActivities: [IwoActivity];
}

export interface IwoActivity {
  name: string;
  description: string;
  sets: number;
  repstime: string;
}
