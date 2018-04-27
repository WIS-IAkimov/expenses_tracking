import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import {HttpHeaders} from '@angular/common/http';

@Injectable()
export class ApiUrlService {

  private readonly _base = environment.baseUrl;

  constructor() { }

  get login() {
    return `${this._base}login/`;
  }

  get logout() {
    return`${this._base}logout/`;
  }

  get registration() {
    return `${this._base}registration/`;
  }

  get expenses() {
    return `${this._base}/expenses/`;
  }

  public getExpense(id: number) {
    return `${this._base}/expenses/${id}/`
  }

  get options() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type'
    });

    // headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    // headers.append('Access-Control-Allow-Credentials', 'true');
    // headers.append('Access-Control-Allow-Headers', 'Content-Type');

    return { headers: headers, withCredentials: true };
  }

}
