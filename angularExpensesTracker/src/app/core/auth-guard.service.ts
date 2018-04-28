import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot  } from '@angular/router';
import {AuthService} from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url = state.url;

    return this.checkLogin(url)
  }


  private checkLogin(url: string) {
    const isLoggedIn = !!localStorage.getItem('auth');

    if (url.indexOf('login') !== -1 || url.indexOf('registration') !== -1) {
      isLoggedIn && this._router.navigate(['/']);

      return !isLoggedIn;
    } else {
      !isLoggedIn && this._router.navigate(['/login']);

      return isLoggedIn;
    }
  }
}
