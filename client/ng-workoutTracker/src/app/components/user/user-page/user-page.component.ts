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
  user$: UserGet;

  username: string;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private authService: AuthenticationService
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('userid');

    this.user$ = this.userService.getUser(id);
    console.log(this.user$);
  }
}
