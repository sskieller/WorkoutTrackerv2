import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services';

@Component({
  selector: 'wt-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ng-workoutTracker';

// Import isLoggedIn from authentication
isLoggedIn$: boolean;
userId: string;

constructor(private authService: AuthenticationService, private router: Router) {

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
public gotoUserPageById(url, userId) {
  userId = this.authService.getUserId();
  const myUrl = `${url}/${userId}`;
  this.router.navigateByUrl(myUrl).then(e => {
    if (e) {
      console.log('Navigation success: Toolbar -> Userpage');
    } else {
      console.log('Navigation failed: Toolbar -> Userpage ');
    }
  });
}

ngOnInit() {
  this.isLoggedIn$ = this.authService.isLoggedIn();
}

}
