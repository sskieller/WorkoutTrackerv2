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

const httpOptions = {
  headers: new HttpHeaders({
    // tslint:disable-next-line: max-line-length
    Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWRjMjk3MDJlZGRlYjMzOGQ0YWI1MDhkIiwiaWF0IjoxNTczMDQ1ODQ1LCJleHAiOjE1NzMxMzIyNDV9.xHdwJh7cqPJL68w0J7kQEpW_YPB9wJ__N0qtcOvtU3s'
    // 'Access-Control-Allow-Origin':'*'
  })
};

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

  getUser(userid): Observable<LoginUser> {
    const url = `${this.userUrl}/${userid}`; // GET api/v1/user/:userid
    return this.http.get<LoginUser>(url, httpOptions);
  }
}
