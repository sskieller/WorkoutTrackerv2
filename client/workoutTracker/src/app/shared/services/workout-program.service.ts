import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { WorkoutActivityInterface } from './workout-activity.service';

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
  [key: string]: any; // HttpParams type compability
  name: string,
  description: string
};

export interface UpdateWorkoutProgramParams {
  [key: string]: any; // HttpParams type compability
  name: string,
  description: string,
  exercises: [WorkoutExerciseInterface]
}

export abstract class WorkoutProgramService {
  abstract getAllWorkoutPrograms(userId: number):
    Observable<WorkoutProgramInterface[]>;
  abstract createNewWorkoutProgram(userId: number, params: CreateWorkoutProgramParams):
    Observable<WorkoutProgramInterface[]>;
  abstract getWorkoutProgramById(userId: number, workoutProgramId: number):
    Observable<WorkoutProgramInterface[]>;
  abstract updateWorkoutProgramById(userId: number, workoutProgramId: number, params: UpdateWorkoutProgramParams):
    Observable<WorkoutProgramInterface[]>;
  abstract deleteWorkoutProgramById(userId: number, workoutProgramId: number):
    Observable<string[]>;
}

@Injectable()
export class HttpWorkoutProgramService implements WorkoutProgramService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) { }

  getAllWorkoutPrograms(userId: number): Observable<WorkoutProgramInterface[]> {
    return this.http.get<WorkoutProgramInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram`);
  }
  createNewWorkoutProgram(userId: number, params: CreateWorkoutProgramParams): Observable<WorkoutProgramInterface[]> {
    return this.http.post<WorkoutProgramInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/new`, params);
  }
  getWorkoutProgramById(userId: number, workoutProgramId: number): Observable<WorkoutProgramInterface[]> {
    return this.http.get<WorkoutProgramInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}`);
  }
  updateWorkoutProgramById(userId: number, workoutProgramId: number, params: UpdateWorkoutProgramParams): Observable<WorkoutProgramInterface[]> {
    return this.http.put<WorkoutProgramInterface[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}`, params);    
  }
  deleteWorkoutProgramById(userId: number, workoutProgramId: number): Observable<string[]> {
    return this.http.delete<string[]>(`${this.baseUrl}/api/v1/user/${userId}/workoutProgram/${workoutProgramId}`);
  }
}
