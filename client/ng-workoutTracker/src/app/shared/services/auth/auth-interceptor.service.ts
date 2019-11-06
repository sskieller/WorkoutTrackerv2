import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) { }
  private tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiNWRjMjk3MDJlZGRlYjMzOGQ0YWI1MDhkIiwiaWF0IjoxNTczMDQ1ODQ1LCJleHAiOjE1NzMxMzIyNDV9.xHdwJh7cqPJL68w0J7kQEpW_YPB9wJ__N0qtcOvtU3s';
  // Intercepts any request made from web app and inserts token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from the service
    
    const authHeader = 'Bearer ' + this.tempToken;//this.auth.getToken();
    // Clone request to add the new header
    const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    // Pass cloned request instead of original request
    return next.handle(authReq);
  }
}

