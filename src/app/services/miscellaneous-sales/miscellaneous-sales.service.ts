import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class MiscellaneousSalesService implements OnDestroy {
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

  addMisc(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/misc-sales/add', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getMiscToday(misc: any): Observable<any> {
    return this.http.get<any>(this.url + '/misc-sales/all/' + misc.date, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getMiscSingleDate(misc: any): Observable<any> {
    return this.http.get<any>(this.url + '/misc-sales/custom/' + misc.date, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getMiscRangeDate(misc: any): Observable<any> {
    return this.http.get<any>(this.url + '/misc-sales/custom/' + misc.fromDate + '/' + misc.toDate, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getMiscById(misc: any): Observable<any> {
    return this.http.get<any>(this.url + '/misc-sales/' + misc.id, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getMiscByDetailId(miscDetail: any): Observable<any> {
    return this.http.get<any>(this.url + '/misc-sales-detail/show/' + miscDetail.id, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  extendMisc(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/misc-sales-detail/add', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  cancelMiscByGroup(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/misc-sales/remove', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  cancelMiscByDetail(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/misc-sales-detail/remove', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getMiscNota(misc: any): Observable<any> {
    return this.http.get<any>(this.url + '/misc-sales-nota/' + misc.id, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
