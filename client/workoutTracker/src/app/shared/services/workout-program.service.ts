import { Injectable } from '@angular/core';
import {WorkoutActivityInterface } from './workout-activity.service';

export interface WorkoutProgramInterface {
  _id: number,
  name: string,
  description: string,
  exercises: [WorkoutExerciseInterface],
  activities: [WorkoutActivityInterface]
};

export interface WorkoutExerciseInterface {
  _id: number,
  name: string,
  description: string,
  sets: number,
  repstime: string
};

export interface CreateWorkoutProgramParams {
  name: string,
  description: string
};

export interface UpdateWorkoutProgramParams {
  name: string,
  description: string,
  exercises: [WorkoutExerciseInterface]
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {

  constructor() { }
}
