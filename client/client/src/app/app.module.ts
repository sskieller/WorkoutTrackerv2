import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home';
import { WorkoutProgramPublicComponent } from './components/workout-program-public/workout-program-public.component';
import { UserComponent } from './components/user/user/user.component';
import { WorkoutProgramComponent } from './components/user/workout-program/workout-program.component';
import { WorkoutActivityComponent } from './components/user/workout-activity/workout-activity.component';
import { LoginComponent } from './components/login/login.component';

import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WorkoutProgramPublicComponent,
    UserComponent,
    WorkoutProgramComponent,
    WorkoutActivityComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FlexLayoutModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
