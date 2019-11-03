import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

import { environment } from '../environments/environment';
import { SHARED_SERVICES } from './shared/services';
// import { SearchFormModule } from './shared/components';
import { routes } from './app.routing';
import { API_BASE_URL } from './app.tokens';
import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: environment.production}),
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    MatButtonModule
    , MatIconModule
    , MatSidenavModule
    , MatToolbarModule, UserModule

    // ,SearchFormModule
  ],
  providers: [
    ...SHARED_SERVICES,
    { provide: API_BASE_URL, useValue: environment.apiBaseUrl }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
