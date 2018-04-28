import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth.service';
import {take} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';


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
      });
  }

  public signOut() {
    this._authService.signOut()
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate(['/login']);
      });
  }
}
