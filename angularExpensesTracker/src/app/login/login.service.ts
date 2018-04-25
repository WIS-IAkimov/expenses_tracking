import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class LoginService {

  constructor(
    private _http: HttpClient
  ) { }

  public login(query) {
    return this._http.post('some/url', query);
  }

}
