import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ResturantListComponent } from './resturant-list/resturant-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { BanknoteSummaryComponent } from './banknote-summary/banknote-summary.component';
import { BilanComponent } from './bilan/bilan.component';
import { SummaryComponent } from './summary/summary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ResturantListComponent,
    UserListComponent,
    BanknoteSummaryComponent,
    BilanComponent,
    SummaryComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule, 
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
