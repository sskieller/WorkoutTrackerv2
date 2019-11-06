import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({providedIn: 'root'})
export class AuthInterceptor implements HttpInterceptor {
  constructor(private auth: AuthenticationService) { }
  // Intercepts any request made from web app and inserts token
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from the service

    const authHeader = 'Bearer ' + this.auth.getToken();
    // Clone request to add the new header
    const authReq = req.clone({setHeaders: {Authorization: authHeader}});
    // Pass cloned request instead of original request
    return next.handle(authReq);
  }
}

