import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { PageChangedEvent } from 'ngx-bootstrap';

import { ExpenseModel } from '../shared/expense.model';
import { ExpenseService } from '../shared/expense.service';
import { RequestParams } from '../../core/request-params.model';
import { PaginationService } from '../../core/pagination.service';
import { UserService } from '../../users/shared/user.service';


@Component({
  selector: 'exp-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  providers: [ PaginationService ]
})
export class ExpensesListComponent implements OnInit {

  public expensesList$: Observable<ExpenseModel[]>;
  public params: RequestParams;
  public totalItems: number;
  public dateRange = null;
  public dateRangeIsOpen: boolean;
  public amountRangeIsOpen: boolean;
  public noActions: boolean;

  constructor(
    private _expenseService: ExpenseService,
    private _paginationService: PaginationService,
    private _router: Router,
    private _userService: UserService
  ) {
    this.params = new RequestParams();
    this.totalItems = 0;
    this.dateRangeIsOpen = false;
    this.amountRangeIsOpen = false;
    this.noActions = false;
    if (this._router.url.indexOf('users') !== -1) {
      this.params.user = this._router.url.split('?')[0].split('/')[2];
      this.noActions = true;
    }
  }

  ngOnInit() {
      this.getParams();
  }

  public removeExpense(id: number) {
    this._expenseService.deleteExpense(id)
      .pipe(take(1))
      .subscribe(() => this.getExpenseList());
  }

  public pageChanged(event: PageChangedEvent) {
    this.params.page = event.page;

    this._paginationService.setParams(this.params);
  }

  public dateRangeChanged(dates: Date[]) {
    if (dates && dates.length) {
      this.params.start_date = dates[0].toISOString();
      this.params.end_date = dates[1].toISOString();
      this._paginationService.setParams(this.params);
    }
  }
  private getParams() {
    this._paginationService.getParams(this.params)
      .subscribe((params: RequestParams) => {
        this.params = params;
        if (this.params.start_date && this.params.end_date) {
          this.dateRange = [new Date(this.params.start_date), new Date(this.params.end_date)];
        }
        this.getExpenseList();
      });
  }

  private getExpenseList() {
    this.expensesList$ = this._expenseService.getExpenseList(this.params.requestParams)
      .pipe(map(data => {
        this.totalItems = data.count;
        return data.results
      }));
  }
}
