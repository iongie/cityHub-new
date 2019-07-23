import { Injectable, OnDestroy } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class RoomOperationService implements OnDestroy {
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
    return this.http.get<any[]>(this.url + '/room/all', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/room/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(roomOperation: any): Observable<any> {
    return this.http.get<any>(this.url + '/room/show/' + roomOperation.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/room/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/room/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }

  inactiveAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/room/remove/' + data.id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  activeAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/room-type/activate/' + data.id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
