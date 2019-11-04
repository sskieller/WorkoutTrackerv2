import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import {WorkoutProgramInterface } from './workout-program.service';
import {WorkoutActivityInterface} from './workout-activity.service';


export interface WorkoutProgramPublicInterface {
  _id: number;
  name: string;
  description: string;
  exercises: [WorkoutProgramInterface];
  activities: [WorkoutActivityInterface];
}

export abstract class WorkoutProgramPublicService {
  abstract getPublicWorkoutProgram(): Observable<WorkoutProgramPublicInterface[]>;
}

@Injectable()
export class HttpWorkoutProgramPublicService implements WorkoutProgramPublicService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}
  getPublicWorkoutProgram(): Observable<WorkoutProgramPublicInterface[]> {
    return this.http.get<WorkoutProgramPublicInterface[]>(`${this.baseUrl}/api/v1/workoutProgram`);
  }
}
