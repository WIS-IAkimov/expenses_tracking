import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { take } from 'rxjs/operators';

import { AuthService } from '../core/auth.service';

interface Login {
  username: string;
  password: string;
}


@Component({
  selector: 'exp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  public login: Login;

  constructor(
    private _authService: AuthService,
    private _router: Router
  ) {
    this.login = {
      username: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  public onSubmit() {
    this._authService.signIn(this.login)
      .pipe(take(1))
      .subscribe(() => {
        this._router.navigate(['/']);
      });
  }

}
