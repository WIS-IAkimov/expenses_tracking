import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { ExpenseModel } from './expense.model';
import { ExpenseService } from '../shared/expense.service';
import {take} from 'rxjs/operators';

@Component({
  selector: 'exp-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  public expensesList$: Observable<ExpenseModel[]>;

  constructor(
    private _expenseService: ExpenseService
  ) {}

  ngOnInit() {
    this.getExpenseList();
  }

  public removeExpense(id: number) {
    this._expenseService.deleteExpense(id).pipe(take(1)).subscribe();
  }

  private getExpenseList() {
    this.expensesList$ = this._expenseService.getExpenseList();
  }

}
