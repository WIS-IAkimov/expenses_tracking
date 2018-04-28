import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiUrlService {

  private readonly _base = environment.baseUrl;

  constructor() { }

  get login() {
    return `${this._base}/users/login/`;
  }

  get logout() {
    return`${this._base}/users/logout/`;
  }

  get registration() {
    return `${this._base}/users/registration/`;
  }

  get expenses() {
    return `${this._base}/expenses/`;
  }

  get tokenVerify() {
    return `${this._base}/token-verify/`;
  }

  get tokenRefresh() {
    return `${this._base}/token-refresh/`;
  }

  get options() {
    const headers = new HttpHeaders();

    headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return { headers: headers};
  }

  public getExpense(id: number) {
    return `${this._base}/expenses/${id}/`
  }

}
