import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class ApiUrlService {

  private readonly _base = environment.baseUrl;

  constructor() { }

  get expenses() {
    return `${this._base}/expenses/`;
  }

  get login() {
    return `${this._base}/users/login/`;
  }

  get logout() {
    return`${this._base}/users/logout/`;
  }

  get registration() {
    return `${this._base}/users/registration/`;
  }

  get tokenRefresh() {
    return `${this._base}/token-refresh/`;
  }

  get tokenVerify() {
    return `${this._base}/token-verify/`;
  }

  get users() {
    return `${this._base}/users/`;
  }

  get options() {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return { headers: headers};
  }

  public getExpense(id: number) {
    return `${this._base}/expenses/${id}/`;
  }

  public getUser(id: number) {
    return `${this._base}/users/${id}/`;
  }

}
