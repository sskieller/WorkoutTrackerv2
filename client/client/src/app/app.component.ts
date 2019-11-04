import { Component } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { UserInterface } from '@models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Workout Tracker';
  currentUser: UserInterface;

  constructor(
    private router: Router,
    // tslint:disable-next-line: no-shadowed-variable
    private AuthenticationService: AuthenticationService
  ) {
    this.AuthenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  logout() {
    this.AuthenticationService.logout();
    this.router.navigate(['/login']);
  }
}
