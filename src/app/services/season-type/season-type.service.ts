import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class SeasonTypeService implements OnDestroy {
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
    return this.http.get<any[]>(this.url + '/season-type', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/season-type/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(seasonTypeId: any): Observable<any> {
    return this.http.get<any>(this.url + '/season-type/show/' + seasonTypeId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/season-type/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/season-type/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }
}
