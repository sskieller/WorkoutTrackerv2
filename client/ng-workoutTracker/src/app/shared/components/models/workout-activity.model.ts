export class WorkoutActivity {
  name: string;
  description: string;
  woActivities: [woActivity];
}

export class CreateActivity {
  name: string;
  description: string;
  woActivity: {
    name: string;
    description: string;
    sets: number;
    repstime: string;
  };
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
