import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      const url = state.url;
      if (this.authService.isLoggedIn) {return true; }
      // Store attempted URL for redirecting
      this.authService.redirectUrl = url;
      // navigate to the login page
      console.log("IM REROUTING")
      this.router.navigate(['user/login']);
      return false;
  }
}
