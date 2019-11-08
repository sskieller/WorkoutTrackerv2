import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { IWorkoutActivity, IWorkoutProgram, IWorkoutProgramActivities } from '../components/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkoutActivityService {
  workoutActivity: IWorkoutActivity;

  private getWorkoutProgramUrl(userId, workoutprogramid) {
    return `${environment.API_BASE_URL}/user/${userId}/workoutprogram/${workoutprogramid}/workoutactivity`;
  }


  constructor(
    private http: HttpClient
  ) { }

  getWorkoutActivities(userId, workoutProgramId): Observable<IWorkoutProgramActivities> {
    const url = `${this.getWorkoutProgramUrl(userId, workoutProgramId)}`;
    return this.http.get<IWorkoutProgramActivities>(url);
  }

  createWorkoutActivity(userId, workoutProgramId, workoutActivity): Observable<IWorkoutActivity> {
    const url = `${this.getWorkoutProgramUrl(userId, workoutProgramId)}/new`;
    return this.http.post<IWorkoutActivity>(url, workoutActivity);
  }
}
