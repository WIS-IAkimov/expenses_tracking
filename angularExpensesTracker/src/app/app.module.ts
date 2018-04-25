import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule, appComponents } from './app-routing.module';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    appComponents,
    AppComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
