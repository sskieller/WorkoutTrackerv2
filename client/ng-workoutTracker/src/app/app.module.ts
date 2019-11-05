import { API_BASE_URL } from './app.tokens';
import { environment } from './../environments/environment';
import { UserModule } from './components/user/user.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ToolbarModule } from './shared/components/toolbar/toolbar.module';
import { AuthenticationService, AuthInterceptor } from './shared/services';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    ToolbarModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: API_BASE_URL, useValue: environment.API_BASE_URL},
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
