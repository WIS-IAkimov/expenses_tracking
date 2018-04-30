import { Component, OnInit } from '@angular/core';

import { AuthService } from '../core/auth.service';

@Component({
  selector: 'exp-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(
    private _authService: AuthService
  ) { }

  get user() {
    return this._authService.user;
  }

  ngOnInit() {
  }

}
