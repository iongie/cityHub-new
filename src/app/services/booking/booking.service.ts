import { Injectable, OnDestroy } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root'
})
export class BookingService implements OnDestroy {
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
  handleError(error: Error | HttpErrorResponse) {
    if(!navigator.onLine){
        console.error('Browser Offline')
    }  else {
       if (error instanceof HttpErrorResponse) {
         if(!navigator.onLine) {
           console.error('Browser Offline')
         } else {
           if(error.status === 500){
             console.error('error 500');
           }
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
    return this.http.get<any[]>(this.url + '/booking/'+menu.name, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  addStepOne(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/add', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  resetStepOne(booking: any): Observable<any> {
    return this.http.get<any>(this.url + '/booking/reset/' + booking.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  addStepTwo(booking: any, dataStepTwo: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/select-room/'+booking.id, dataStepTwo, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }
  
  addPayment(payment: any): Observable<any> {
    return this.http.post<any>(this.url + '/payment/add', payment, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  addDeposit(payment: any): Observable<any> {
    return this.http.post<any>(this.url + '/payment/deposit', payment, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  assignRoom(assignRoom: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/asign-room', assignRoom, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  checkIn(checkIn: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/checkin', checkIn, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  checkOut(checkOut: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/checkout', checkOut, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getByBookingId(booking: any): Observable<any> {
    return this.http.get<any>(this.url + '/booking/room/' + booking.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getByBookingRoomId(bookingRoom: any): Observable<any> {
    return this.http.get<any>(this.url + '/booking/show/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  

  getChargeById(booking: any): Observable<any> {
    return this.http.get<any>(this.url + '/charge/' + booking.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }



  // tidak terpakai
  getById(bookingRoom: any): Observable<any> {
    return this.http.get<any>(this.url + '/booking/show/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  
}
