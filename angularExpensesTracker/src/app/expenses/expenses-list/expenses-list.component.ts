import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { PageChangedEvent } from 'ngx-bootstrap';

import { ExpenseModel } from './expense.model';
import { ExpenseService } from '../shared/expense.service';
import { RequestParams } from '../../core/request-params.model';
import { PaginationService } from '../../core/pagination.service';


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


  constructor(
    private _expenseService: ExpenseService,
    private _paginationService: PaginationService,
  ) {
    this.params = new RequestParams();
    this.totalItems = 0;
    this.dateRangeIsOpen = false;
    this.amountRangeIsOpen = false;
  }

  ngOnInit() {
    this._paginationService.getParams()
      .subscribe((params: RequestParams) => {
        this.params = params;
        if (this.params.start_date && this.params.end_date) {
          this.dateRange = [new Date(this.params.start_date), new Date(this.params.end_date)];
        }
        this.getExpenseList();
      });
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

  private getExpenseList() {
    this.expensesList$ = this._expenseService.getExpenseList(this.params.requestParams)
      .pipe(map(data => {
        this.totalItems = data.count;
        return data.results
      }));
  }
}
