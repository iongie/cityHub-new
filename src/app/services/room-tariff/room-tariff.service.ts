import { Injectable, OnDestroy } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Subject, throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class RoomTariffService implements OnDestroy {
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
    return this.http.get<any[]>(this.url + '/room-tariff', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/room-tariff/update', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

}
