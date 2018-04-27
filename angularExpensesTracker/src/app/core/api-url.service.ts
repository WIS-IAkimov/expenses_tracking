import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';

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

}
