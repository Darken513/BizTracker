import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ResturantListComponent } from './resturant-list/resturant-list.component';
import { UserListComponent } from './user-list/user-list.component';
import { BanknoteSummaryComponent } from './banknote-summary/banknote-summary.component';
import { BilanComponent } from './bilan/bilan.component';
import { SummaryComponent } from './summary/summary.component';

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
  { path: 'home', component: ResturantListComponent },
  { path: 'employees/:res_id', component: UserListComponent },
  { path: 'banknoteSum', component: BanknoteSummaryComponent },
  { path: 'bilan', component: BilanComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'auth/login/:user_id', component: LoginComponent,/*  canActivate: [AuthGuard] */ },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
