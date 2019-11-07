import { Observable } from 'rxjs';
import { UserId } from './../components/models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { IWorkoutProgram } from '../components/models';
import { AuthenticationService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramService {
  workoutProgramsUser: IWorkoutProgram;

private workoutProgramUrl = `${environment.API_BASE_URL}/user/${this.authService.getUserId()}/workoutProgram`;

  constructor(
    private authService: AuthenticationService,
    private http: HttpClient
    ) { }

    getWorkoutProgramsForUser(): Observable<IWorkoutProgram> {
      const url = `${this.workoutProgramUrl}/user`;
      return this.http.get<IWorkoutProgram>(url);
    }
}
