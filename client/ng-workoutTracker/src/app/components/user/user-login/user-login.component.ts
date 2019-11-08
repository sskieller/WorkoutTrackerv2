import { UserService, AuthenticationService } from 'src/app/shared/services';
import { Component, OnInit } from '@angular/core';
import { LoginUser } from 'src/app/shared/components/models';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wt-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  user: LoginUser;
  isLoggedIn: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user = new LoginUser();
  }

  ngOnInit() {
  }

  delay(ms: number) {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
  }

  async newLogin() {
    await this.authService.pLogin(this.user);

    await this.delay(300);

    console.log(this.authService.isLoggedInLocal())
    if (this.authService.isLoggedInLocal()) {
      console.log("is logged in")
    }
    else {
      console.log("is not logged in")
    }
  }

  async login() {
    await this.authService.pLogin(this.user);
    while (!this.authService.getUserId()) {
      await this.delay(100);
    }
    let isLoggedInBool = this.authService.isLoggedInLocal()
    const url = `/user/${this.authService.getUserId()}`;

    if (isLoggedInBool) {
      this.router.navigateByUrl(url);
    }
    else {
      this.user = new LoginUser();
    }
  }
}
