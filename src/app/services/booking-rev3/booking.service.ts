import { Injectable, OnDestroy } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError, Subject } from 'rxjs';
import { HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
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
    if (!navigator.onLine) {
        console.error('Browser Offline');
    }  else {
       if (error instanceof HttpErrorResponse) {
         if (!navigator.onLine) {
           console.error('Browser Offline');
         } else {
           if (error.status === 500) {
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

  // all, booked, reserved, on going, done, cancel
  get(menuBookingList: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/booking/show/' + menuBookingList.name, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getBookingInformation(booking: any): Observable<any> {
    return this.http.get<any>(this.url + '/booking/information/' + booking.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getBookingIRoomInformation(bookingRoom: any): Observable<any> {
    return this.http.get<any[]>(this.url + '/booking/room/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getCharge(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/charge/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getChargeTotal(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/charge/total' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }



  // just Info for Add Booking , Move Room, Extend Room
  checkRoom(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/room-information', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  addBooking(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/add', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }


  cancelBookingByBookingId(booking: any, data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/cancel/' + booking.id, data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  cancelBookingByBookingRoomId(bookingRoom: any, data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/room/cancel/' + bookingRoom.id, data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  assignRoom(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/asign-room', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  checkIn(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/check-in', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  checkOut(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/checkout', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  noShow(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/booking/no-show', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  // ====================================Extra Charge=========================================
  extraCharge(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/extra-payment/add', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  getExtraPaymentByBookingRoomId(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/extra-payment/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  getExtraPaymentByExtraPaymentId(extraPayment: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/extra-payment/show/' + extraPayment.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }

  editExtraPayment(data: any): Observable<any> {
    return this.http.post<any>(this.url + '/extra-payment/edit', data, httpOptions).pipe(
      catchError(this.handleError),
      tap(() => {
        this._refresh.next();
      }),
    );
  }

  disabledExtraPayment(payment: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/extra-payment/remove/' + payment.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
  // =========================================================================================

  // ======================================Payment============================================
    payment(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/payment/add', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }

    deposit(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/payment/deposit', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }

    getPaymentByBookingRoomId(bookingRoom: any): Observable<any[]> {
      return this.http.get<any[]>(this.url + '/payment/' + bookingRoom.id, httpOptions).pipe(
        catchError(this.handleError),
      );
    }

    getPaymentByPaymentId(payment: any): Observable<any[]> {
      return this.http.get<any[]>(this.url + '/payment/show/' + payment.id, httpOptions).pipe(
        catchError(this.handleError),
      );
    }

    editPayment(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/payment/edit', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }

    disabledPayment(payment: any): Observable<any[]> {
      return this.http.get<any[]>(this.url + '/payment/remove/' + payment.id, httpOptions).pipe(
        catchError(this.handleError),
      );
    }
  // =========================================================================================


  // ===================================Case MOVE ROOM========================================
    moveRoom(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/booking/move', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }
  // =========================================================================================

  // ==================================Case Extend ROOM=======================================
    extendRoom(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/booking/extend', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }
  // =========================================================================================


  // ========================================Stay=============================================
    addStay(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/booking/stay/add', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }

    lessStay(data: any): Observable<any> {
      return this.http.post<any>(this.url + '/booking/stay/less', data, httpOptions).pipe(
        catchError(this.handleError),
        tap(() => {
          this._refresh.next();
        }),
      );
    }
  // =========================================================================================

  // ========================================Nota=============================================
  notaReservation(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/nota/reservation/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
  notaCheckIn(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/nota/checkin/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
  notaDeposit(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/nota/deposit/return/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
  notaCheckOut(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/nota/checkout/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
  notaExtraCharge(bookingRoom: any): Observable<any[]> {
    return this.http.get<any[]>(this.url + '/nota/extra-charge/' + bookingRoom.id, httpOptions).pipe(
      catchError(this.handleError),
    );
  }
  // =========================================================================================

}
