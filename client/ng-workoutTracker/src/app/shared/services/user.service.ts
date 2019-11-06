import { Injectable } from '@angular/core';
import { LoginUser, User } from '../components/models';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
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


  private userUrl = `${environment.API_BASE_URL}/user`;
  private handleError: HandleError;
  // private handleError = httpErrorHandler.

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandlerService) {
    this.handleError = httpErrorHandler.createHandleError('UserService');
  }

  getUser(userid): any {
    const url = `${this.userUrl}/${userid}`; // GET api/v1/user/:userid
    this.http.get<User>(url).subscribe(data => {
      console.log('getUser(userid) returned data:')
      console.log(data);
    });
  }
}
