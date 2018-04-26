import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppRoutingModule, appComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiUrlService } from './shared/api-url.service';
import { AuthService } from './shared/auth.service';
import { AuthGuardService } from './shared/auth-guard.service';


@NgModule({
  declarations: [
    appComponents,
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ApiUrlService,
    AuthService,
    AuthGuardService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
