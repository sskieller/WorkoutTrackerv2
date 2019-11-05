import { RouterModule, RouterLink } from '@angular/router';
import { ToolbarComponent } from './toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule,
    FlexLayoutModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class ToolbarModule { }
