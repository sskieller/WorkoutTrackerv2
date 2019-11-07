import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { IWorkoutProgram, IWorkoutProgramPrivate } from '../components/models';
import { AuthenticationService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {
  workoutProgramsUser: IWorkoutProgram;

  private getUrl(userId) {
    return `${environment.API_BASE_URL}/user/${userId}/workoutProgram`;
  }

  constructor(
    private http: HttpClient
    ) { }

    /**
     * returns all workout programs in system with more info than public
     * @param userId
     */
    getWorkoutProgramsPrivate(userId): Observable<IWorkoutProgramPrivate[]> {
      return this.http.get<IWorkoutProgramPrivate[]>(this.getUrl(userId));
    }

    /**
     * returns the workout programs solely connected to user
     * @param userId
     */
    getWorkoutProgramsForUser(userId): Observable<IWorkoutProgram[]> {
      const url = `${this.getUrl(userId)}/user`;
      return this.http.get<IWorkoutProgram[]>(url);
    }

    getWorkoutProgramById(userId, workoutProgramId): Observable<IWorkoutProgramPrivate> {
      const url = `${this.getUrl(userId)}/${workoutProgramId}`;
      return this.http.get<IWorkoutProgramPrivate>(url);
    }

    /**
     * creates a new workout program for the given user
     * @param userId
     * @param workoutProgram
     */
    createWorkoutProgram(userId, workoutProgram): Observable<IWorkoutProgram> {
      const url = `${this.getUrl(userId)}/new`;
      return this.http.post<IWorkoutProgram>(url, workoutProgram);
    }

    /**
     * adds an exercise to the given program for the given user
     * @param userId
     * @param workoutProgramId
     * @param workoutExercise
     */
    addExerciseToProgram(userId, workoutProgramId, workoutExercise): Observable<IWorkoutProgram> {
      const url = `${this.getUrl(userId)}/${workoutProgramId}`;
      return this.http.put<IWorkoutProgram>(url, workoutExercise);
    }
}
