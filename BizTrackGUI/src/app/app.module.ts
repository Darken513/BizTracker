import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { BanknoteSummaryComponent } from './components/banknote-summary/banknote-summary.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { SummaryComponent } from './components/summary/summary.component';
import { LoadingInterceptor } from './loading.interceptor';
import { JwtInterceptor } from './jwt.interceptor';
import { AuthGuard } from './auth.guard';
import { BilanWrapperComponent } from './components/bilan-wrapper/bilan-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RestaurantListComponent,
    UserListComponent,
    BanknoteSummaryComponent,
    BilanComponent,
    SummaryComponent,
    BilanWrapperComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
