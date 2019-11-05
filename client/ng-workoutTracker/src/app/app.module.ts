import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarComponent } from './shared/components/toolbar/toolbar.component';
import { PublicWorkoutProgramComponent } from './components/public-workout-program/public-workout-program.component';
import { UserLoginComponent } from './components/user/user-login/user-login.component';
import { UserRegistrationComponent } from './components/user/user-registration/user-registration.component';
import { UserPageComponent } from './components/user/user-page/user-page.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    PublicWorkoutProgramComponent,
    UserLoginComponent,
    UserRegistrationComponent,
    UserPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
