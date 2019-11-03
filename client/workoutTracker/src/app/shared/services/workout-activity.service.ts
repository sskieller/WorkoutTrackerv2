import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';

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

@Injectable({
  providedIn: 'root'
})
export class WorkoutActivityService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}
}
