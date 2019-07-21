import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = environment.baseUrl;
  constructor(
    public http: HttpClient,
    public router: Router,
  ) { }


  // --------------------------for Handle Error----------------
  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code from server-side: ${error.status}\nMessage: ${error.message}`;
    }
    // window.alert(errorMessage);
    return throwError(errorMessage);
  }

  register(user: any): Observable<any> {
    return this.http.post<any>(this.url + '/user/add', user, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(user: any): Observable<any> {
    return this.http.post<any>(this.url + '/user/edit', user, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  login(user: any): Observable<any> {
    return this.http.post<any>(this.url + '/user/login', user, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  detailAfterLogin(token: any): Observable<any> {
    return this.http.post<any>(this.url + '/user/login/details', token, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  isLoggednIn() {
    return localStorage.getItem('p_l1oxt') !== null;
  }

  isLoggedInUndefined() {
    return localStorage.getItem('p_l1oxt') !== undefined;
  }

  logout(token: any): Observable<any> {
    // localStorage.removeItem('p_l1oxt');
    // this.router.navigate(['auth/login']);
    return this.http.post<any>(this.url + '/user/logout', token, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  inactiveAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/user/remove/' + data.id).pipe(
      catchError(this.handleError),
    );
  }

  activeAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/user/activation/' + data.id).pipe(
      catchError(this.handleError),
    );
  }

  get(): Observable<any> {
    return this.http.get<any>(this.url + '/user/show/all').pipe(
      catchError(this.handleError),
    );
  }

  getById(userId: any): Observable<any> {
    return this.http.get<any>(this.url + '/user/' + userId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
}
