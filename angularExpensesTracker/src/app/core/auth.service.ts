import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, take } from 'rxjs/operators';

import { ApiUrlService } from './api-url.service';

@Injectable()
export class AuthService {

  public isLoggedIn$: EventEmitter<boolean>;
  public user: any;

  constructor(
    private _apiUrlService: ApiUrlService,
    private _http: HttpClient
  ) {
    this.isLoggedIn$ = new EventEmitter<boolean>(true);
    this.isLoggedIn$.emit(!!localStorage.getItem('auth'));
    this.verifyToken();
  }

  public verifyToken() {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth) {
      this.user = auth.user;
      this._http.post(this._apiUrlService.tokenVerify, {token: auth.token})
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isLoggedIn$.emit(true);
          },
          error: err => {
            if (err.status === 400) {
              this.refreshToken(auth);
            } else {
              localStorage.removeItem('auth');
            }
          }
        })
    }
  }

  public signIn(query) {
    return this._http.post(this._apiUrlService.login, query, this._apiUrlService.options)
      .pipe(map(data => {
        localStorage.setItem('auth', JSON.stringify(data));
        this.isLoggedIn$.emit(true);

        return data;
      }));
  }

  public signOut() {
    localStorage.removeItem('auth');
    this.isLoggedIn$.emit(false);
  }

  public signUp(query) {
    return this._http.post(this._apiUrlService.registration, query, this._apiUrlService.options).
      pipe(map((data) => {
        localStorage.setItem('auth', JSON.stringify(data));
        this.isLoggedIn$.emit(true);

        return data;
    }));
  }

  private refreshToken(auth) {
    this._http.post(this._apiUrlService.tokenRefresh, {token: auth.token})
      .pipe(take(1))
      .subscribe({
        next: (token) => {
          auth.token = token;

          localStorage.setItem('auth', JSON.stringify(auth));
        },
        error: () => {
          localStorage.removeItem('auth');
          this.isLoggedIn$.emit(false);
        }
      })
  }
}
