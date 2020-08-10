import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';
import { TeaminfoComponent } from './views/teaminfo/teaminfo.component';
import { HttpClientModule } from '@angular/common/http';
import { GetDetailsComponent } from './views/get-details/get-details.component';
import { LoginComponent } from './views/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    TeaminfoComponent,
    GetDetailsComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
