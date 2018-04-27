import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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
    private _formBuilder: FormBuilder,
    private _route: ActivatedRoute
  ) {
    this.isNew = false;
  }

  ngOnInit() {
    this.initForm();
    this.getUrlParams()
  }

  public submit() {
    if (this.expenseForm.valid) {
      this.isNew ? this.createExpense() : this.updateExpense();
    }
  }

  reset() {
  }

  private initForm() {
    this.expenseForm = this._formBuilder.group({
      id: [''],
      description: ['', Validators.required],
      date: [new Date(), Validators.required],
      amount: [null, Validators.compose([Validators.required, Validators.min(0)])],
      comment: ['']
    });
  }

  private getUrlParams() {
    this._id = this._route.snapshot.params.id;
    this.isNew = this._id.indexOf('new') !== -1;
  }

  private createExpense() {
  }

  private updateExpense() {
  }

}
