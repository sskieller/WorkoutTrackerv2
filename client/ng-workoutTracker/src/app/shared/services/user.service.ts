import { Injectable } from '@angular/core';
import { UserGet } from '../components/models';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userGet: UserGet;

  private userUrl = `${environment.API_BASE_URL}/user`;
  // private handleError = httpErrorHandler.

  constructor(private http: HttpClient) {
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
