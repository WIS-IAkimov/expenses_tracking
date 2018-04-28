import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import {map, take} from 'rxjs/operators';

import { ExpenseModel } from './expense.model';
import { ExpenseService } from '../shared/expense.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

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
  public pageCount: number[];
  public params: RequestParams;

  constructor(
    private _expenseService: ExpenseService,
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.params = new RequestParams();
    this.pageCount = [];
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

  public pageChange(index: number) {
    this.params.page = index;
    this._router.navigate(['/'], {relativeTo: this._route, queryParams: this.params});
  }

  private defaultNavigate() {
    this._router.navigate(
      ['/'],
      {replaceUrl: true, relativeTo: this._route, queryParams: this.params});
  }

  private getExpenseList() {
    const expensesPaginator$ = this._expenseService.getExpenseList({page: this.params.page});

    this.expensesList$ = expensesPaginator$.pipe(map(data => data.results));
    !this.pageCount.length && expensesPaginator$.pipe(take(1))
      .subscribe(data => {
      const count = Math.ceil(+data.count / 20);

      for (let i = 1; i <= count; i++) {
        this.pageCount.push(i);
      }
    });
  }

}
