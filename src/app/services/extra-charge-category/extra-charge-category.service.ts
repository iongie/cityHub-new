import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ExtraChargeCategoryService {
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
    return this.http.get<any[]>(this.url + '/extra-charge-category', httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/extra-charge-category/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(extraChargeCategoryId: any): Observable<any> {
    return this.http.get<any>(this.url + '/extra-charge-category/show/' + extraChargeCategoryId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/extra-charge-category/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/extra-charge-category/remove/' + data.id, data).pipe(
      catchError(this.handleError),
    );
  }
}
