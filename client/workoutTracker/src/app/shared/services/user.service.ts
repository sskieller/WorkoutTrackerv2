import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_BASE_URL } from '../../app.tokens';
import { WorkoutProgramInterface } from './workout-program.service';

export interface UserInterface {
  _id: number,
  name: {
    firstName: string,
    lastName: string
  },
  username: string,
  password: string,
  workoutPrograms: [WorkoutProgramInterface]
};

export interface CreateUserParams {
  [key: string]: any; // HttpParams type compability
  name: {
    firstName: string,
    lastName: string
  };
  username: string;
  password: string;
}

export interface LoginUserParams {
  [key: string]: any; // HttpParams type compability
  username: string,
  password: string,
}

export abstract class UserService {
  abstract createUser(params: CreateUserParams): Observable<UserInterface[]>;
  abstract loginUser(params: LoginUserParams): Observable<string[]>;
  abstract logoutUser(userId: number): Observable<string[]>;
  abstract getUserById(userId: number): Observable<UserInterface[]>;
  abstract updateUserById(userId: number, params: CreateUserParams): Observable<UserInterface[]>;
  abstract deleteUserById(userId: number): Observable<string[]>;
}

@Injectable()
export class HttpUserService implements UserService {
  constructor(
    @Inject(API_BASE_URL) private baseUrl: string,
    private http: HttpClient
  ) {}
  createUser(params: CreateUserParams): Observable<UserInterface[]> {
    return this.http.post<UserInterface[]>(`${this.baseUrl}/api/v1/user/new`, {params});
  }

  loginUser(params: LoginUserParams): Observable<string[]> {
    return this.http.post<string[]>(`${this.baseUrl}/api/v1/user/login`, {params});
  }

  logoutUser(userId: number): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/api/v1/user/${userId}/logout`);
  }

  getUserById(userId: number): Observable<UserInterface[]> {
    return this.http.get<UserInterface[]>(`${this.baseUrl}/api/v1/user/${userId}`);
  }

  updateUserById(userId: number, params: CreateUserParams): Observable<UserInterface[]> {
    return this.http.put<UserInterface[]>(`${this.baseUrl}/api/v1/user/${userId}`, params);
  }

  deleteUserById(userId: number): Observable<string[]> {
    return this.http.delete<string[]>(`${this.baseUrl}/api/v1/user/${userId}`);
  }
}
