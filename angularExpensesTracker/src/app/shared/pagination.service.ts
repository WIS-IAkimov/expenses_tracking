import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {RequestParams} from './request-params.model';

/**
 * @whatItDoes This service needs to work with url params which needs to paginate grid.
 *
 * @howToUse
 *
 * To get params from url it should be called function {@link getParams}. This function
 * reads all url params and creates a stream with params type of RequestParams,
 * then navigate. The function {@link getParams} has unrequired param currentParams.
 * This param need for asign params on init. If url hasn't got any params it navigates by default params (page: 1, page_size: 20).
 *
 * If it's needed to change grid page it should be called {@link setParams} function.
 * This function has required parameter params and unrequired parameter event.
 * Event param needs to calculate page and page size.
 *
 *
 * ### Example
 *
 * ```
 * public params: RequestParams;
 *
 * constructor(private _pagination: PaginationService) {}
 *
 * ngOnInit() {
 *  this._paramsSubscription = this._pagination.getParams(this.params)
      .subscribe((params: RequestParams) => {
        this.params = params;
        this.getProducts();
      });
 * }
 *
 * pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this._pagination.setParams(this.params, event);
  }
 *
 * searchProduct(search: string) {
    if (search) {
      this.params.search = search;
    } else {
      delete this.params.search;
    }
    this._pagination.setParams(this.params);
  }
 *
 *
 */
@Injectable()
export class PaginationService implements OnDestroy {

  private _pageSubscription: Subscription;

  constructor(
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  ngOnDestroy() {
    this._pageSubscription && this._pageSubscription.unsubscribe();
  }

  public getParams(currentParams?: RequestParams): Observable<RequestParams> {
    return Observable.create(observer => {
      this._pageSubscription = this._route.queryParamMap
        .subscribe({
          next: (params: ParamMap) => {
            if (params.keys.length > 0) {
              observer.next(this.validateParams(params));
            } else {
              this.navigateUrl(currentParams || new RequestParams(), true);
            }
          },
          error: err => observer.error(err),
          complete: () => observer.complete()
        });
    });
  }

  public setParams(params: RequestParams) {
    this.navigateUrl(params);
  }

  private navigateUrl(params: RequestParams, replaceUrl?: boolean) {
    this._router.navigate(['/'],
      {queryParams: params, replaceUrl: replaceUrl, relativeTo: this._route});
  }

  private validateParams(params: ParamMap) {
    let currentParams = new RequestParams();

    params.keys.forEach((key: string) => {
      const paramValue = params.get(key);

      switch (key) {
        case 'page_size': {
          if (isNaN(+paramValue) && +paramValue !== 20) {
            currentParams[key] = 20;
          } else  {
            currentParams[key] = +paramValue;
          }
          break;
        }

        case 'page': {
          if (isNaN(+paramValue)) {
            currentParams[key] = 1;
          } else {
            currentParams[key] = Math.floor(Math.abs(+paramValue));
          }
          break;
        }

        case 'start_date':
        case 'end_date': {
          currentParams[key] = paramValue;
          break;
        }

        default: {
          currentParams[key] = paramValue;
        }
      }
    });

    return currentParams;
  }
}
