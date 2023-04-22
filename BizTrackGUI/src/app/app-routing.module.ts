import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { BanknoteSummaryComponent } from './components/banknote-summary/banknote-summary.component';
import { BilanComponent } from './components/bilan/bilan.component';
import { SummaryComponent } from './components/summary/summary.component';
import { AuthGuard } from './auth.guard';
import { BilanWrapperComponent } from './components/bilan-wrapper/bilan-wrapper.component';

const routes: Routes = [
  { path: 'home', component: RestaurantListComponent },
  { path: 'employees/:id', component: UserListComponent },
  { path: 'summary', component: BilanWrapperComponent, canActivate: [AuthGuard] },
  { path: 'auth/login/:resid/:username', component: LoginComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
