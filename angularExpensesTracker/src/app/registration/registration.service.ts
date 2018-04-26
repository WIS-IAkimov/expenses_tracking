import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RegistrationService {

  constructor(
    private _http: HttpClient
  ) { }

  public signUp(query) {
    return this._http.post('registration', query);
  }

}
