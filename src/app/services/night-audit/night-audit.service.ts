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
export class NightAuditService implements OnDestroy {
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

  getNightAudit(nightAudit: any): Observable<any> {
    return this.http.get<any>(this.url + '/audit/closing/' + nightAudit.date, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
