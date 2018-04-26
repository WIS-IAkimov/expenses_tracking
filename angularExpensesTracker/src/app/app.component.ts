import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './shared/auth.service';
import {take} from 'rxjs/operators';


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
    this.isLoggedIn = this._authService.isLoggedIn;
  }

  public signOut() {
    this._authService.signOut()
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate(['/login']);
      });
  }
}
