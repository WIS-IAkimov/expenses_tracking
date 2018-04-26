import { Component, OnInit } from '@angular/core';
import {ExpenseModel} from './expense.model';

@Component({
  selector: 'exp-expenses-list',
  templateUrl: './expenses-list.component.html',
  styleUrls: ['./expenses-list.component.scss']
})
export class ExpensesListComponent implements OnInit {

  public expensesList: ExpenseModel[];

  constructor() {
    this.expensesList = [ new ExpenseModel({
      id: 1,
      description: 'some',
      date: new Date(),
      time: new Date(),
      amount: 35.25
    })]
  }

  ngOnInit() {
  }

}
