import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { LoginService } from './login.service';
import { take } from 'rxjs/operators';

interface Login {
  name: string;
  password: string;
}

@Component({
  selector: 'exp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [ LoginService ]
})
export class LoginComponent implements OnInit {

  public login: Login;

  constructor(
    private _loginService: LoginService,
    private _router: Router
  ) {
    this.login = {
      name: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  public onSubmit() {
    this._loginService.login(this.login)
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

}
