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
export class ReportService implements OnDestroy {
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

  getReportDaily(): Observable<any> {
    return this.http.get<any>(this.url + '/report/summary/daily', httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getArrivalListReport(report: any): Observable<any> {
    return this.http.get<any>(this.url + '/report/arrival/' + report.fromDate + '/' + report.toDate, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getNumberOfNightReport(report: any): Observable<any> {
    return this.http.get<any>(this.url + '/report/no-of-nights/' + report.fromDate + '/' + report.toDate, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getUserShiftReport(report: any): Observable<any> {
    return this.http.get<any>(this.url + '/report/user-shift/' + report.fromDate + '/' + report.toDate, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
