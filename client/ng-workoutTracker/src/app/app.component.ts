import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, UserService } from './shared/services';

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-workoutTracker';

  // Import isLoggedIn from authentication
  isLoggedIn: Observable<boolean>;
  // isLoggedIn: boolean;
  userId: string;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private userService: UserService) {
                this.isLoggedIn = authService.isLoggedIn();
  }

  public gotoWorkoutProgramsPrivate() {
    this.router.navigateByUrl(`/user/${this.authService.getUserId()}/workoutprogram`);
  }

  public gotoWorkoutProgramsPublic() {
    this.router.navigateByUrl(`workoutprogram`);
  }

  public gotoUserLogin(url) {
    this.router.navigateByUrl(url).then(e => {
      if (e) {
        console.log('Navigation success: Toolbar -> Login');
      } else {
        console.log('Navigation failed: Toolbar -> Login ');
      }
    });
  }
  public gotoUserPageById() {
    this.userId = this.authService.getUserId();
    const myUrl = `user/${this.userId}`;
    this.router.navigateByUrl(myUrl).then(e => {
      if (e) {
        console.log('Navigation success: Toolbar -> Userpage');
      } else {
        console.log('Navigation failed: Toolbar -> Userpage ');
      }
    });
  }

  public gotoUserRegistration() {
    this.router.navigateByUrl(`user/new`);
  }

  public logoutUser() {
    this.authService.logout();
    this.router.navigateByUrl('/home')
      .then(e => {
        if (e) {
          console.log('Nav suc: Toolbar -> Logout');
        } else {
          console.log('Nav fail: Toolbar -> Logout');
        }
      });
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
  }
}
