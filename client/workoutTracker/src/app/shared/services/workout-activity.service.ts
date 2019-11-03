import { Injectable } from '@angular/core';

export interface WorkoutActivityInterface {
  _id: number,
  name: string,
  description: string,
  activities: [woActivities]
};

export interface woActivities {
  _id: number,
  name: string,
  description: string,
  sets: number,
  repstime: string
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutActivityService {

  constructor() { }
}
