import { Component, OnInit } from '@angular/core';
import { RegisterUser } from 'src/app/shared/components/models';
import { AuthenticationService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'wt-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.scss']
})
export class UserRegistrationComponent implements OnInit {
  user: RegisterUser;

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.user = new RegisterUser();
  }

  ngOnInit() {
  }

  registerUser() {
    this.authService.register(this.user);
    const url = `/user/login`;
    this.router.navigateByUrl(url);
  }

}
