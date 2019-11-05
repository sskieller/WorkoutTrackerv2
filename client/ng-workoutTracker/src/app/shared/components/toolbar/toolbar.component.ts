import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Router } from '@angular/router';
 // https://angular.io/tutorial/toh-pt5#add-a-hero-detail-route
 // https://www.techiediaries.com/angular-router-routerlink-navigate-navigatebyurl/
 // https://angular.io/api/common/NgIf
 // https://angular.io/guide/router#route-parameters
 // https://material.angular.io/components/button/overview
 // http://localhost:3000/api-docs/#/
@Component({
  selector: 'wt-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

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
