import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './core/auth.service';
import {Subscription} from 'rxjs/Subscription';


@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  public isLoggedIn: boolean;

  private _isLoggedInSubscription: Subscription;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {}

  get user() {
    return this._authService.user;
  }

  ngOnInit() {
    this._isLoggedInSubscription = this._authService.isLoggedIn$
      .subscribe((isLoggedIn: boolean) => {
        this.isLoggedIn = isLoggedIn;
        !this.isLoggedIn && this._router.navigate(['/login'], {replaceUrl: true});
      });
  }

  ngOnDestroy() {
    this._isLoggedInSubscription && this._isLoggedInSubscription.unsubscribe();
  }

  public signOut() {
    this._authService.signOut();
    this._router.navigate(['/login']);
  }
}
