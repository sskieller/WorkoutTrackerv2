import { ToolbarComponent } from './toolbar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [ToolbarComponent],
  imports: [
    CommonModule,
    MatToolbarModule
  ],
  exports: [
    ToolbarComponent
  ],
  providers: [
    AuthenticationService
  ]
})
export class ToolbarModule { }
