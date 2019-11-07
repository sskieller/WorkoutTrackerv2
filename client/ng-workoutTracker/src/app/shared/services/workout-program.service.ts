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

    getWorkoutProgramsPrivate(userId): Observable<IWorkoutProgramPrivate[]> {
      const url = `${this.getUrl(userId)}/workoutProgram`;
      return this.http.get<IWorkoutProgramPrivate[]>(url);
    }
}
