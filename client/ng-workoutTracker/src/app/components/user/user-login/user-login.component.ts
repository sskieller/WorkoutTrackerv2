import { UserService, AuthenticationService } from 'src/app/shared/services';
import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/shared/components/models';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  user: LoginUser;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user = new LoginUser();
  }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.user);
    const url = `/user/${this.authService.getUserId()}`;
    console.log("NAVIGATING");
    console.log(url);
    this.router.navigateByUrl(url);
  }


}

