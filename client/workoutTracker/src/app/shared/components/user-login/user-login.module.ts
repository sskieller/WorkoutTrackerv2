import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserLoginComponent } from './user-login.component';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  declarations: [
    UserLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule,


    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    UserLoginComponent
  ]
})
export class UserLoginModule { }
