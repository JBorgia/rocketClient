import { Injectable } from '@angular/core';
import { AuthenticationService } from '@services/authentication.service';
import { LoginService } from '@services/login.service';
import { Router, CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

    constructor(
        private router: Router,
        private loginService: LoginService,
        private authenticationService: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const url: string = state.url;
        return this.checkLogin(url);
        // return true;
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.canActivate(route, state);
    }

    checkLogin(url: string): boolean {
        if (this.authenticationService.isLoggedIn()) {
            return true;
        }
        console.log('User is not logged - This routing guard prvents redirection to any routes that needs logging.');
        // Store the original url in login service and then redirect to login page
        this.loginService.landingPage = url;
        this.router.navigate(['login']);
        return false;
    }

    logout() {
        localStorage.removeItem('token');
        this.router.navigate(['login']);
    }
}

