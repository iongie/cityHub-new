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
export class PrivilegeService {
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
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/privilege', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/privilege/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(this.url + '/privilege', {
      params: {id: id.toString() },
    }).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/privilege/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/privilege/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }
}
