import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AuthGuard } from './auth.guard';
import { BilanWrapperComponent } from './components/bilan-wrapper/bilan-wrapper.component';
import { NotSignedInGuard } from './notSignedIn.guard';

const routes: Routes = [
  { path: 'home', component: RestaurantListComponent, canActivate: [NotSignedInGuard] },
  { path: 'employees/:id', component: UserListComponent, canActivate: [NotSignedInGuard] },
  { path: 'summary', component: BilanWrapperComponent, canActivate: [AuthGuard] },
  { path: 'auth/login/:resid/:username', component: LoginComponent, canActivate: [NotSignedInGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
