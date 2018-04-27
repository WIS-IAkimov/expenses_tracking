import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { ExpenseService } from '../shared/expense.service';
import {take} from 'rxjs/operators';
import {ExpenseModel} from '../expenses-list/expense.model';

@Component({
  selector: 'exp-expense-details',
  templateUrl: './expense-details.component.html',
  styleUrls: ['./expense-details.component.scss']
})
export class ExpenseDetailsComponent implements OnInit {

  public expenseForm: FormGroup;
  public isNew: boolean;

  private _id: string;

  constructor(
    private _expenseService: ExpenseService,
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) {
    this.isNew = false;
  }

  ngOnInit() {
    this.initForm();
    this.getUrlParams();
    !this.isNew && this.getExpense();
  }

  public submit() {
    if (this.expenseForm.valid) {
      this.isNew ? this.createExpense() : this.updateExpense();
    }
  }

  reset() {
    this._expenseService.selectedExpense$
      .pipe(take(1))
      .subscribe((expense: ExpenseModel) => this.expenseForm.patchValue(expense));
  }

  private initForm() {
    this.expenseForm = this._formBuilder.group({
      id: [''],
      description: ['', Validators.required],
      created_at: [new Date(), Validators.required],
      amount: [null, Validators.compose([Validators.required, Validators.min(0)])],
      comment: ['']
    });
  }

  private getUrlParams() {
    this._id = this._route.snapshot.params.id;
    this.isNew = this._id.indexOf('new') !== -1;
  }

  private getExpense() {
    this._expenseService.getExpense(+this._id).
      pipe(take(1))
      .subscribe((expense: ExpenseModel) => this.expenseForm.patchValue(expense));
  }

  private createExpense() {
    this._expenseService.createExpense(new ExpenseModel(this.expenseForm.getRawValue()));
  }

  private updateExpense() {
    this._expenseService.updateExpense(new ExpenseModel(this.expenseForm.getRawValue()));
  }

}
