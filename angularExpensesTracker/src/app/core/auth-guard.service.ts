import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot  } from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;
    let status = this.checkLogin(url);

    if (status) {
      status = this.checkPermission(route);
    }

    return status;
  }


  private checkLogin(url: string): boolean {
    const isLoggedIn = !!localStorage.getItem('auth');

    if (url.indexOf('login') !== -1 || url.indexOf('registration') !== -1) {
      isLoggedIn && this._router.navigate(['/']);

      return !isLoggedIn;
    } else {
      !isLoggedIn && this._router.navigate(['/login']);

      return isLoggedIn;
    }
  }

  private checkPermission(route): boolean {
    const expectedRole = route.data.expectedRole;
    if (expectedRole) {
      const user = JSON.parse(localStorage.getItem('auth')).user;

      if (user.role !== expectedRole) {
        this._router.navigate(['/']);

        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
}
