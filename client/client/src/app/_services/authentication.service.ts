import { UserInterface } from './../_models/user';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '@environments/environment';
import { map } from 'rxjs/operators';

export interface CreateUserParams {
  name: {
    firstName: string,
    lastName: string
  };
  username: string;
  password: string;
}

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserInterface>;
  public currentUser: Observable<UserInterface>;

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInterface>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserInterface {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.httpClient.post<any>(`${environment.API_BASE_URL}/user/login`, { username, password })
      .pipe(map(user => {
        // Store details about user and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  createUser(params: CreateUserParams) {
    return this.httpClient.post<any>(`${environment.API_BASE_URL}/user/new`, {params});
  }
}
