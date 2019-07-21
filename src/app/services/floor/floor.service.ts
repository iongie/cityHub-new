import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class FloorService {
  private url = environment.baseUrl;
  constructor(
    public http: HttpClient,
  ) { }

  // --------------------------for Handle Error----------------
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code from server-side : ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/floor/all', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/floor/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(userId: any): Observable<any> {
    return this.http.get<any>(this.url + '/floor/show/' + userId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/floor/edit/' + data.id, data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/floor/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }

  inactiveFloor(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/floor/remove/' + data.id).pipe(
      catchError(this.handleError),
    );
  }

  activeFloor(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/floor/return/' + data.id).pipe(
      catchError(this.handleError),
    );
  }
}
