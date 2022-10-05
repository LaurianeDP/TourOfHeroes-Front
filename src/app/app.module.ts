import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from "@angular/common/http";
// import { HttpClientInMemoryWebApiModule } from "angular-in-memory-web-api";
// import { InMemoryDataService } from './services/in-memory-data.service';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { HeroBadgeComponent } from "./hero-badge/hero-badge.component";
import { HeroFormComponent } from './hero-form/hero-form.component';
import {MatButtonModule} from "@angular/material/button";
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatInputModule} from "@angular/material/input";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from '@angular/material/list';
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatTableModule} from "@angular/material/table";
import { AdminLoginComponent } from './admin-login/admin-login.component';
import {HTTP_INTERCEPTORS} from "@angular/common/http"
import {AuthInterceptor} from "./interceptors/auth.interceptor";


@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent,
    MessagesComponent,
    DashboardComponent,
    HeroSearchComponent,
    HeroBadgeComponent,
    HeroFormComponent,
    AdminLoginComponent
  ],
  imports: [
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {dataEncapsulation: false}),
    MatButtonModule,
    FlexLayoutModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonToggleModule,
    MatTableModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
