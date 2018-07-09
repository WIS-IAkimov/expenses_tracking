import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { map, take } from 'rxjs/operators';

import { PageChangedEvent } from 'ngx-bootstrap';

import {Role, UserModel} from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { RequestParams } from '../../core/request-params.model';
import { PaginationService } from '../../core/pagination.service';

@Component({
  selector: 'exp-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  providers: [ PaginationService ]
})
export class UsersListComponent implements OnInit, OnDestroy {

  public usersList$: Observable<UserModel[]>;
  public params: RequestParams;
  public totalItems: number;
  public filterIsOpen: boolean;
  public roles: string[];

  private _paramsSubscription: Subscription;


  constructor(
    private _userService: UserService,
    private _paginationService: PaginationService,
  ) {
    this.params = new RequestParams();
    this.totalItems = 0;
    this.filterIsOpen = false;
    this.roles = [];
    Object.keys(Role).forEach((key: string) => {
      this.roles.push(Role[key]);
    })
  }

  ngOnInit() {
    this._paramsSubscription = this._paginationService.getParams()
      .subscribe((params: RequestParams) => {
        this.params = params;
        this.getUsersList();
      });
  }

  ngOnDestroy() {
    this._paramsSubscription && this._paramsSubscription.unsubscribe();
  }

  public removeUser(id: number) {
    this._userService.deleteUser(id)
      .pipe(take(1))
      .subscribe(() => this.getUsersList());
  }

  public pageChanged(event: PageChangedEvent) {
    this.params.page = event.page;

    this._paginationService.setParams(this.params);
  }

  public roleChanged() {
    this._paginationService.setParams(this.params);
  }

  private getUsersList() {
    this.usersList$ = this._userService.getUsersList(this.params.requestParams)
      .pipe(map(data => {
        this.totalItems = data.count;
        return data.results
      }));
  }

}
