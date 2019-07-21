import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class TaxService {
  private url = environment.baseUrl;
  constructor(
    public http: HttpClient,
  ) { }

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

  get(): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/tax/all', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/tax/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(taxId: any): Observable<any> {
    return this.http.get<any>(this.url + '/tax/show/' + taxId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/tax/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/tax/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }

  inactiveAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/tax/remove/' + data.id).pipe(
      catchError(this.handleError),
    );
  }

  activeAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/tax/activation/' + data.id).pipe(
      catchError(this.handleError),
    );
  }
}
