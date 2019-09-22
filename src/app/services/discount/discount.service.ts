import { Injectable, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, throwError, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class DiscountService implements OnDestroy {
  private url = environment.baseUrl;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
  ) { }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // ! --------------------------for Handle Error----------------
  handleError(error: Error | HttpErrorResponse) {
    if (!navigator.onLine) {
        console.error('Browser Offline');
    }  else {
       if (error instanceof HttpErrorResponse) {
         if (!navigator.onLine) {
           console.error('Browser Offline');
         } else {
           if (error.status === 500) {
             console.error('error 500');
           }
           console.error('Http Error');
         }
       } else {
         console.error('Client Error');
       }
       console.error(error);
    }
    return throwError(error);
  }

  get refresh() {
    return this._refresh;
  }

  // TODO: all, on, active, inactive
  get(menuDiscountList: any): Observable<any> {
    return this.http.get<any>(this.url + '/discount/' + menuDiscountList.name, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getById(discount: any): Observable<any> {
    return this.http.get<any>(this.url + '/discount/show/' + discount.id, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/discount/add', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/discount/edit', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  active(discount: any): Observable<any> {
    return this.http.get<any>(this.url + '/discount/change/active/' + discount.id, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  inactive(discount: any): Observable<any> {
    return this.http.get<any>(this.url + '/discount/change/inactive/' + discount.id, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
