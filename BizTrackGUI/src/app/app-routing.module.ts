import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { BanknoteSummaryComponent } from './components/banknote-summary/banknote-summary.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { SummaryComponent } from './components/summary/summary.component';

/*
const routes: Routes = [
  { path: 'auth/login', component: LoginPageComponent, canActivate: [AuthGuard] },
  { path: 'auth/signup', component: SignupPageComponent, canActivate: [AuthGuard] },
  { path: 'home', component: HomePageComponent },
  { path: 'test', component: TestComponent },
  { path: 'test/new/:day', component: TestComponent },
  { path: 'test/review/:test_id', component: TestComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'auth/login', pathMatch: 'full' }
];
*/

const routes: Routes = [
  { path: 'home', component: RestaurantListComponent },
  { path: 'employees/:id', component: UserListComponent },
  { path: 'banknoteSum', component: BanknoteSummaryComponent },
  { path: 'bilan', component: BilanComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'auth/login/:resid/:username', component: LoginComponent,/*  canActivate: [AuthGuard] */ },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
