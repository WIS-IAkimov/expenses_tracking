import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';

import { PageChangedEvent } from 'ngx-bootstrap';

import { ExpenseModel } from '../shared/expense.model';
import { ExpenseService } from '../shared/expense.service';
import { RequestParams } from '../../core/request-params.model';
import { PaginationService } from '../../core/pagination.service';
import {PrintingService} from '../../core/printing.service';


@Component({
  selector: 'exp-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss'],
  providers: [ PaginationService, PrintingService ]
})
export class ExpensesListComponent implements OnInit {

  public expensesList$: Observable<ExpenseModel[]>;
  public params: RequestParams;
  public totalItems: number;
  public dateRange = null;
  public amountRange: {from: number, to: number};
  public dateRangeIsOpen: boolean;
  public amountRangeIsOpen: boolean;
  public noActions: boolean;

  @ViewChild('printSection') private _printContents: ElementRef;

  constructor(
    private _expenseService: ExpenseService,
    private _paginationService: PaginationService,
    private _printingService: PrintingService,
    private _router: Router,
  ) {
    this.params = new RequestParams();
    this.totalItems = 0;
    this.dateRangeIsOpen = false;
    this.amountRangeIsOpen = false;
    this.amountRange = {from: null, to: null};
    this.noActions = false;
    if (this._router.url.indexOf('users') !== -1) {
      this.params.user = this._router.url.split('?')[0].split('/')[2];
      this.noActions = true;
    }
  }

  ngOnInit() {
    this._paginationService.getParams(this.params)
      .subscribe((params: RequestParams) => {
        this.params = params;
        if (this.params.created_from && this.params.created_to) {
          this.dateRange = [new Date(this.params.created_from), new Date(this.params.created_to)];
        }
        if (this.params.amount_from && this.params.amount_to) {
          this.amountRange = { from: +this.params.amount_from, to: +this.params.amount_to };
        }
        this.getExpenseList();
      });
  }

  public print(): void {
    const curr = new Date;
    const first = curr.getDate() - curr.getDay();
    const last = first + 6;

    this.params.created_from = new Date(curr.setDate(first)).toISOString();
    this.params.created_to = new Date(curr.setDate(last)).toISOString();
    this.getExpenseList();
    setTimeout(() => {
      this._printingService.print(this._printContents.nativeElement);
    }, 500);
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

  public amountRangeChanged() {
    if (this.amountRange.from && this.amountRange.to && this.amountRange.from <= this.amountRange.to) {
      this.params.amount_from = this.amountRange.from;
      this.params.amount_to = this.amountRange.to;
      this._paginationService.setParams(this.params);
    }
  }

  public dateRangeChanged(dates: Date[]) {
    if (dates && dates.length) {
      this.params.created_from = dates[0].toISOString();
      this.params.created_to = dates[1].toISOString();
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
