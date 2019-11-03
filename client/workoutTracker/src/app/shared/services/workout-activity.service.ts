import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { CreateWorkoutProgramParams, UpdateWorkoutProgramParams } from './workout-program.service';

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
};

export interface CreateWorkoutActivityParams {
  [key: string]: any; // HttpParams type compability
  name: string,
  description: string
}

export interface UpdateWorkoutActivityParams {
  [key: string]: any; // HttpParams type compability
  name: string,
  description: string,
  activities: [woActivities]
}

export abstract class WorkoutActivityService {
  abstract getAllWorkoutActivity(userId: number, workoutProgramId: number):
    Observable<WorkoutActivityInterface[]>;
  abstract createWorkoutActivity(userId: number, workoutProgramId: number, params: CreateWorkoutProgramParams):
    Observable<WorkoutActivityInterface[]>;
  abstract getWorkoutActivityById(userId: number, workoutProgramId: number, workoutActivityId: number):
    Observable<WorkoutActivityInterface[]>;
  abstract updateWorkoutActivityById(userId: number, workoutProgramId: number, workoutActivityId: number, params: UpdateWorkoutActivityParams):
    Observable<WorkoutActivityInterface[]>;
}

@Injectable()
export class HttpWorkoutActivityService implements WorkoutActivityService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) { }

  getAllWorkoutActivity(userId: number, workoutProgramId: number):
    Observable<WorkoutActivityInterface[]> {
      return this.http.get<WorkoutActivityInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}/workoutActivity`);
    }
  createWorkoutActivity(userId: number, workoutProgramId: number, params: CreateWorkoutActivityParams):
    Observable<WorkoutActivityInterface[]>{
      return this.http.post<WorkoutActivityInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}/workoutActivity`, {params});
    }
  getWorkoutActivityById(userId: number, workoutProgramId: number, workoutActivityId: number):
    Observable<WorkoutActivityInterface[]> {
      return this.http.get<WorkoutActivityInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}/workoutActivity/${workoutActivityId}`);
    }
  updateWorkoutActivityById(userId: number, workoutProgramId: number, workoutActivityId: number, params: UpdateWorkoutActivityParams):
    Observable<WorkoutActivityInterface[]> {
      return this.http.put<WorkoutActivityInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}/workoutActivity/${workoutActivityId}`, {params});
    }
}
