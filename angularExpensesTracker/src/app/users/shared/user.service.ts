import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { map, take } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { ToastrService } from 'ngx-toastr';

import { UserModel } from './user.model';
import { ApiUrlService } from '../../core/api-url.service';

@Injectable()
export class UserService {
  private _usersList$: Observable<UserModel[]>;
  private _selectedUser$: Observable<UserModel>;

  constructor(
    private _apiUrlService: ApiUrlService,
    private _http: HttpClient,
    private _toastr: ToastrService
  ) { }

  get selectedUser$() {
    return this._selectedUser$;
  }

  public getUsersList(filter?: any) {
    return this._usersList$ = this._http.get(this._apiUrlService.users, {params: filter})
      .pipe(map((data: any) => {
        data.results.map(item => new UserModel(item));

        return data;
      }));
  }

  public getUser(id: number) {
    if (this._usersList$) {
      this._selectedUser$ = Observable.create(observer => {
        this._usersList$
          .pipe(take(1))
          .subscribe({
            next: (response: any) => {
              response.results.some((user: UserModel) => {
                if (user.id === id) {
                  observer.next(user);
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
      this._selectedUser$ = this._http.get(this._apiUrlService.getUser(id))
        .pipe(map(data => new UserModel(data)));
    }

    return this.selectedUser$;
  }

  public createUser(user: UserModel) {
    return this._http.post(this._apiUrlService.users, user)
      .pipe(map(data => {
        this._selectedUser$ = of(new UserModel(data));
        this._toastr.success('', 'User create successfully');

        return new UserModel(data);
      }));
  }

  public updateUser(user: UserModel) {
    return this._http.put(this._apiUrlService.getUser(user.id), user)
      .pipe(map(data => {
        this._selectedUser$ = of(new UserModel(data));
        this._toastr.success('', 'User update successfully');

        return new UserModel(data);
      }));
  }

  public deleteUser(id: number) {
    return this._http.delete(this._apiUrlService.getUser(id), this._apiUrlService.options);
  }

}
