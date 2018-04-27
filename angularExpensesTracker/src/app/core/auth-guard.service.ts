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
    if (url.indexOf('login') !== -1 || url.indexOf('registration') !== -1) {
      this._authService.isLoggedIn && this._router.navigate(['/']);

      return !this._authService.isLoggedIn;
    } else {
      !this._authService.isLoggedIn && this._router.navigate(['/login']);

      return this._authService.isLoggedIn;
    }
  }
}
