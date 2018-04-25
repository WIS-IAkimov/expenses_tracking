import { Component, OnInit } from '@angular/core';

interface Login {
  name: string;
  password: string;
}

@Component({
  selector: 'exp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: Login;

  constructor() {
    this.login = {
      name: '',
      password: ''
    }
  }

  ngOnInit() {
  }

  public onSubmit() {
  }

}
