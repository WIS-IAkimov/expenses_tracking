import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { catchError } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _toastr: ToastrService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): any {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      const authReq = req.clone({headers: req.headers.set('Authorization', `JWT ${auth.token}`)});

      return this.catchError(next.handle(authReq));
    }

    return this.catchError(next.handle(req));
  }

  private catchError(req: Observable<HttpEvent<any>>): any {
    return req.pipe(
      catchError(err => {
        let errors = '';
        Object.keys(err.error).forEach((key: string) => {
          errors += `<p>${key}: ${this.getErrorContent(err.error[key])}</p>`
        });
        this._toastr.error(errors, `${err.status}`, {enableHtml: true});

        return err;
      }));
  }

  private getErrorContent(list: string[]): string {
    let content = '';

    list.forEach(segment => {
      content += `<span>${segment}</span><br>`;
    });

    return content;
  }
}
