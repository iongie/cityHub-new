import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError, takeUntil, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ExtraChargeService implements OnDestroy {
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

  // --------------------------for Handle Error----------------
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error Client Code: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Server Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get refresh() {
    return this._refresh;
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/extra-charge/all', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/extra-charge/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(seasonTypeId: any): Observable<any> {
    return this.http.get<any>(this.url + '/extra-charge/show/' + seasonTypeId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/extra-charge/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/extra-charge/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }

  inactiveAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/extra-charge/remove/' + data.id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  activeAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/extra-charge/activate/' + data.id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
