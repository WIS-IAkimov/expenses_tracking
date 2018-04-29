import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth.service';


@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public isLoggedIn: boolean;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this._authService.isLoggedIn$
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        !this.isLoggedIn && this._router.navigate(['/login'], {replaceUrl: true});
      });
  }

  public signOut() {
    this._authService.signOut();
    this._router.navigate(['/login']);
  }
}