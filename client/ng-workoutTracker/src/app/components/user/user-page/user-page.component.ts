import { Component, OnInit } from '@angular/core';
import { UserService, AuthenticationService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User, UserGet } from 'src/app/shared/components/models';

@Component({
  selector: 'wt-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  selectedId: number;
  user$: User;

  username: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) {
    console.log('constructing userpage');
    this.user$ = new User();
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userid');

    this.userService.getUser(id)
      .subscribe((data: UserGet) => {
        this.user$ = {
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          password: data.password,
          workoutPrograms: data.workoutPrograms
        };
      });
  }
}
