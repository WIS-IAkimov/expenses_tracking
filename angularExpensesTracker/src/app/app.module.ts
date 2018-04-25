import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
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
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
