import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
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
// import { SHARED_SERVICES } from './shared/services';
// import { SearchFormModule } from './shared/components';
import { routes } from './app.routing';
import { API_BASE_URL } from './app.tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    BrowserAnimationsModule,

    MatButtonModule
    ,MatIconModule
    ,MatSidenavModule
    ,MatToolbarModule

    // ,SearchFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
