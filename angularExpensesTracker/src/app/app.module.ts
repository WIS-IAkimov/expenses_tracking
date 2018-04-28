import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule, appComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiUrlService } from './core/api-url.service';
import { AuthService } from './core/auth.service';
import { AuthGuardService } from './core/auth-guard.service';
import { AuthInterceptor } from './core/auth.interceptor';
import { ExpenseService } from './shared/expense.service';


@NgModule({
  declarations: [
    appComponents,
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BsDatepickerModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    ReactiveFormsModule,
    TimepickerModule.forRoot(),
    ToastrModule.forRoot()
  ],
  providers: [
    ApiUrlService,
    AuthService,
    AuthGuardService,
    ExpenseService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
