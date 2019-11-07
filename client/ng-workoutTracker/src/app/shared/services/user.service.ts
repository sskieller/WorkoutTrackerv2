import { Injectable } from '@angular/core';
import { LoginUser, User, UserGet } from '../components/models';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError, BehaviorSubject} from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map} from 'rxjs/operators';
import { HandleError, HttpErrorHandlerService } from './http-error-handler.service';

// https://www.concretepage.com/questions/544

interface LoginResponse {
  token: string;
  user: {
    _id: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user: any;
  userGet: UserGet;

  private userUrl = `${environment.API_BASE_URL}/user`;
  // private handleError = httpErrorHandler.

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandlerService) {
  }

  // getUser(userid)  {
  //   const url = `${this.userUrl}/${userid}`; // GET api/v1/user/:userid
  //   return this.http.get(url);
  // }

  getUser(userid): Observable<UserGet> {
    const url = `${this.userUrl}/${userid}`; // GET api/v1/user/:userid
    return this.http.get<UserGet>(url);
  }
}
