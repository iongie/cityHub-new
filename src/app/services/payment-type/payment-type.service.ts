import { Injectable } from '@angular/core';
import { throwError, Subject, Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../notification/notification.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class PaymentTypeService {
  private url = environment.baseUrl;
  private subs: Subject<void> = new Subject();
  private _refresh = new Subject();
  constructor(
    public http: HttpClient,
    public notifServ: NotificationService,
  ) { }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // --------------------------for Handle Error----------------
  handleError(error: Error | HttpErrorResponse) {
    if(!navigator.onLine){
        console.error('Browser Offline')
    }  else {
       if (error instanceof HttpErrorResponse) {
         if(!navigator.onLine) {
           console.error('Browser Offline')
         } else {
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

  get(menu: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/payment-type/'+menu.name, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  add(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/payment-type/add', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getById(paymentTypeId: any): Observable<any> {
    return this.http.get<any>(this.url + '/payment-type/show/' + paymentTypeId.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  update(data: any): Observable<any> {
    return this.http.post(this.url + '/payment-type/edit', data, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  delete(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/payment-type/remove/' + data.id, data).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  inactiveAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/payment-type/remove/' + data.id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  activeAuth(data: any): Observable<any> {
    return this.http.get<any>(this.url + '/payment-type/activate/' + data.id).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
}
