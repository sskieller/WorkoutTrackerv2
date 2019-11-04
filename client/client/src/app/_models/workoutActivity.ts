export interface WorkoutActivityInterface {
  _id: number;
  name: string;
  description: string;
  activities: [woActivities];
}

// tslint:disable-next-line: class-name
export interface woActivities {
  _id: number;
  name: string;
  description: string;
  sets: number;
  repstime: string;
}
