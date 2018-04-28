import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { PageChangedEvent } from 'ngx-bootstrap';

import { ExpenseModel } from './expense.model';
import { ExpenseService } from '../shared/expense.service';

class RequestParams {
  public page: number;
  public page_size: number;

  constructor(data: any = {}) {
    this.page = data.page || 1;
    this.page_size = data.page_size || 20;
  }
}

@Component({
  selector: 'exp-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  public expensesList$: Observable<ExpenseModel[]>;
  public params: RequestParams;
  public totalItems: number;

  constructor(
    private _expenseService: ExpenseService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.params = new RequestParams();
    this.totalItems = 0;
  }

  ngOnInit() {
    this._route.queryParamMap.subscribe((params: ParamMap) => {
      if (Object.keys(params.keys).length) {
        if (+params.get('page') > 0) {
          this.params.page = +params.get('page');
        } else {
          this.defaultNavigate();
        }
        if (params.get('page_size') && +params.get('page_size') === 20) {
          this.params.page_size = +params.get('page_size');
        } else {
          this.defaultNavigate();
        }
        this.getExpenseList();
      } else {
        this.defaultNavigate();
      }
    });
  }

  public removeExpense(id: number) {
    this._expenseService.deleteExpense(id)
      .pipe(take(1))
      .subscribe(() => this.getExpenseList());
  }

  public pageChanged(event: PageChangedEvent) {
    this.params.page = event.page;
    this._router.navigate(['/'], {relativeTo: this._route, queryParams: this.params});
  }

  private defaultNavigate() {
    this._router.navigate(
      ['/'],
      {replaceUrl: true, relativeTo: this._route, queryParams: this.params});
  }

  private getExpenseList() {
    this.expensesList$ = this._expenseService.getExpenseList({page: this.params.page})
      .pipe(map(data => {
        this.totalItems = data.count;
        return data.results
      }));
  }
}
