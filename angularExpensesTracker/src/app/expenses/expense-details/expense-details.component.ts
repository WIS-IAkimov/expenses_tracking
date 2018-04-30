import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { take } from 'rxjs/operators';

import { ExpenseService } from '../shared/expense.service';
import { ExpenseModel } from '../shared/expense.model';

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
    private _route: ActivatedRoute,
    private _router: Router
  ) {
    this.isNew = false;
  }

  ngOnInit() {
    this.initForm();
    this.getUrlParams();
    !this.isNew && this.getExpense();
  }

  public save() {
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
    this.updateForm(this._expenseService.getExpense(+this._id));
  }

  private createExpense() {
    this.updateForm(this._expenseService.createExpense(new ExpenseModel(this.expenseForm.getRawValue())));
  }

  private updateExpense() {
    this.updateForm(this._expenseService.updateExpense(new ExpenseModel(this.expenseForm.getRawValue())));
  }

  private updateForm(expense$: Observable<ExpenseModel>) {
    expense$
      .pipe(take(1))
      .subscribe((expense: ExpenseModel) => {
        this.expenseForm.patchValue(new ExpenseModel(expense));
        if (this.isNew) {
          const url = this._router.url.split('new')[0] + expense.id.toString();

          this.isNew = false;
          this._router.navigate([url], {replaceUrl: true});
        }
      });
  }
}
