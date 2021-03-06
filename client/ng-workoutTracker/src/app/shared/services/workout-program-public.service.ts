import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { IWorkoutProgramPublic } from '../components/models';

@Injectable({
  providedIn: 'root'
})
export class WorkoutProgramPublicService {

  private workoutProgramPublicUrl = `${environment.API_BASE_URL}/workoutprogram`;
  private handleError: HandleError;

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getWorkoutProgramsPublic(): Observable<IWorkoutProgramPublic[]> {
    return this.http.get<IWorkoutProgramPublic[]>(this.workoutProgramPublicUrl);
  }
}
