import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'wt-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  // Import isLoggedIn from authentication

  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
  }

}
