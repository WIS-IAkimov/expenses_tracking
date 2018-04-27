import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = JSON.parse(localStorage.getItem('auth'));
    if (auth) {
      const authReq = req.clone({headers: req.headers.set('Authorization', `JWT ${auth.token}`)});

      return next.handle(authReq);
    }

    return next.handle(req);
  }
}
