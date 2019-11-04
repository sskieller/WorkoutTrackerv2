import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WorkoutProgramPublicInterface } from '@models/workoutProgramPublic';
import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class WorkoutProgramPublicService {
  constructor(private httpClient: HttpClient) { }

  getWorkoutProgramPublic() {
    return this.httpClient.get<WorkoutProgramPublicInterface[]>(`${environment.API_BASE_URL}/workoutProgram`);
  }
}

