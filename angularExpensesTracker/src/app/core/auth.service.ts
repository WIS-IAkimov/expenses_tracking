import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiUrlService } from './api-url.service';
import {map, tap} from 'rxjs/operators';

@Injectable()
export class AuthService {

  public isLoggedIn: boolean;

  constructor(
    private _apiUrlService: ApiUrlService,
    private _http: HttpClient
  ) {
    this.isLoggedIn = !!localStorage.getItem('auth');
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
}
