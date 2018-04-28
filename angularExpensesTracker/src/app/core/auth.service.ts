import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiUrlService } from './api-url.service';
import {catchError, map, take, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean;

  constructor(
    private _apiUrlService: ApiUrlService,
    private _http: HttpClient
  ) {
    this.isLoggedIn = !!localStorage.getItem('auth');
    this.verifyToken();
  }

  public verifyToken() {
    const auth = JSON.parse(localStorage.getItem('auth'));

    if (auth) {
      this._http.post(this._apiUrlService.tokenVerify, {token: auth.token})
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.isLoggedIn = true;
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
        this.isLoggedIn = true;

        return data;
      }));
  }

  public signOut() {
     return this._http.post(this._apiUrlService.logout, {})
      .pipe(
        tap(() => {
          localStorage.removeItem('auth');
          this.isLoggedIn = false;
        }));
  }

  public signUp(query) {
    return this._http.post(this._apiUrlService.registration, query, this._apiUrlService.options).
      pipe(map((data) => {
        localStorage.setItem('auth', JSON.stringify(data));
        this.isLoggedIn = true;

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
          this.isLoggedIn = false;
        }
      })
  }
}
