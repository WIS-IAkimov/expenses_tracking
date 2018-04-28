import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { ApiUrlService } from '../core/api-url.service';
import { Observable } from 'rxjs/Observable';
import { ExpenseModel } from '../expenses-list/expense.model';
import {map, take, tap} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ExpenseService {

  private _expenseList$: Observable<ExpenseModel[]>;
  private _selectedExpense$: Observable<ExpenseModel>;

  constructor(
    private _apiUrlService: ApiUrlService,
    private _http: HttpClient
  ) { }

  get selectedExpense$() {
    return this._selectedExpense$;
  }

  public getExpenseList(filter?: any) {
    return this._expenseList$ = this._http.get(this._apiUrlService.expenses, {params: filter})
      .pipe(map((data: any) => {
        data.results.map(item => new ExpenseModel(item));

        return data;
      }));
  }

  public getExpense(id: number) {
    if (this._expenseList$) {
      this._selectedExpense$ = Observable.create(observer => {
        this._expenseList$
          .pipe(take(1))
          .subscribe({
            next: (response: any) => {
              response.results.some((expense: ExpenseModel) => {
                if (expense.id === id) {
                  observer.next(expense);
                  return true;
                }

                return false;
                });
              },
            error: err => observer.error(err),
            complete: () => observer.complete()
          });
      });
    } else {
      this._selectedExpense$ = this._http.get(this._apiUrlService.getExpense(id))
        .pipe(map(data => new ExpenseModel(data)));
    }

    return this.selectedExpense$;
  }

  public createExpense(expense: ExpenseModel) {
    return this._http.post(this._apiUrlService.expenses, expense)
      .pipe(map(data => {
        this._selectedExpense$ = of(new ExpenseModel(data));

        return new ExpenseModel(data);
      }));
  }

  public updateExpense(expense: ExpenseModel) {
    return this._http.put(this._apiUrlService.getExpense(expense.id), expense)
      .pipe(map(data => {
        this._selectedExpense$ = of(new ExpenseModel(data));

        return new ExpenseModel(data);
      }));
  }

  public deleteExpense(id: number) {
    console.log(this._apiUrlService.options);
    debugger;
    return this._http.delete(this._apiUrlService.getExpense(id), this._apiUrlService.options)
      .pipe(tap(() => {
        this.getExpenseList();
      }));
  }
}
