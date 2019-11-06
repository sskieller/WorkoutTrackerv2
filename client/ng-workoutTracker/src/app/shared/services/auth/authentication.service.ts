import { environment } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { RegisterUser, User, LoginUser, UserId } from '../../components/models';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

interface AuthResponse {
  token: string;
}

interface LoginResponse {
  token: string;
  user: {
    _id: string;
  };
}


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  // tslint:disable-next-line: variable-name
  private api_base_url = environment.API_BASE_URL;
  public redirectUrl = '';

  constructor(private http: HttpClient) { }

  isUserLoggedIn$ = this.isLoginSubject.asObservable();


  public currentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const payload = JSON.parse(window.atob(token.split('.')[1]));
      const user = new User();
      user.name.firstName = payload.name.firstName;
      user.name.lastName = payload.name.lastName;
      user._id = payload._id;
      user.username = payload.username;
      user.workoutPrograms = payload.workoutProgram;

      return user;
    } else {
      return;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  public logout() {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }

  public login(user: LoginUser): any {
    const url = `${this.api_base_url}/user/login`;
    this.http.post<LoginResponse>(url, user).subscribe(data => {
      console.log(data);
      this.saveToken(data.token);
      this.saveUserId(data.user._id);
      return true;
    });
  }

  public register(user: RegisterUser): any {
    const url = `${this.api_base_url}/user/new`;
    this.http.post<AuthResponse>(url, user).subscribe(data => {
      console.log(data);
      return true;
    },
      // Errors will call this callback instead
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          console.log(`Message: ${err.message}`);
        }
        return false;
      });
  }

  public saveToken(token: string) {
    localStorage.setItem('token', token);
    this.isLoginSubject.next(true);
  }

  public getToken() {
    const token = window.localStorage.getItem('token');
    if (token) {
      return token;
    } else {
      return '';
    }
  }

  private saveUserId(userId: string) {
    window.localStorage.userId = userId;
  }
  public getUserId(): string {
    return window.localStorage.userId;
    // return '0';
  }
}
