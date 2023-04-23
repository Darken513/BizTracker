import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Injectable()
export class NotSignedInGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(): boolean {
        if (this.authService.getToken()) {
            this.router.navigate(['/summary']);
            return false;
        } else {
            return true;
        }
    }
}