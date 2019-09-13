import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { Subject, combineLatest } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-nota',
  templateUrl: './nota.component.html',
  styleUrls: ['./nota.component.scss'],
})
export class NotaComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  notaCheckIn = {
    bookingNo:'',
    guestName:'',
    roomName:'',
    datePrint: new Date(),
    totalCharge: '',
    amountToWord: '',
    paymentType: '',
    checkInBy: '',
  };

  notaCheckOut = {
    billNo: '',
    guestName: '',
    address: '',
    national: '',
    roomName: '',
    duration: '',
    arrivalDate: new Date(),
    departureDate: new Date(),
    totalRent: 0,
    totalTax: 0,
    totalDiscount: 0,
    totalCharge: '',
    total: 0,
    amountToWord: '',
    datePrint: new Date(),
    balance: 0,
    checkInBy: '',
    checkOutBy: '',
    charge: [
      {
        date: new Date(),
        nominal: 0,
        particular: '',
      },
    ],
  };

  @ViewChild('content') content: ElementRef;
  constructor(
    public bookingServ: BookingService,
    public router: Router,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getNota();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getNota() {
    this.activeRoute.params.subscribe(params => {
      const bookingRoom = {
        id: params.id,
      };
      combineLatest(
        this.bookingServ.notaReservation(bookingRoom),
        this.bookingServ.notaExtraCharge(bookingRoom),
        this.bookingServ.notaDeposit(bookingRoom),
        this.bookingServ.notaCheckIn(bookingRoom),
        this.bookingServ.notaCheckOut(bookingRoom),
      ).pipe(takeUntil(this.subs)).subscribe(resNota => {
        const writtenForm = require('written-number');

        // ! get data nota check in
        this.notaCheckIn = {
          roomName: resNota[3].room.room_name,
          guestName: resNota[3].guest.guest_name,
          bookingNo : resNota[3].booking.booking_number,
          datePrint: new Date (Date.now()),
          checkInBy: resNota[3].room.checkin_by,
          paymentType: resNota[3].total_charge.payment_type,
          totalCharge: resNota[3].total_charge.total_charge,
          amountToWord: writtenForm(resNota[3].total_charge.total_charge),
        };
        console.log('nota', resNota); 
        
        // ! get data nota check out
        this.notaCheckOut = {
          billNo: resNota[4].total_charge.billing_number,
          guestName: resNota[4].guest.guest_name,
          address: resNota[4].guest.address,
          national: resNota[4].guest.country_name,
          roomName: resNota[4].room.room_name,
          checkInBy: resNota[4].room.checkin_by,
          checkOutBy: resNota[4].room.checkout_by,
          duration: resNota[4].room.duration,
          arrivalDate: resNota[4].room.arrival_date,
          departureDate: resNota[4].room.departure_date,
          totalRent: resNota[4].subtotal_charge.total_rent,
          totalTax: resNota[4].subtotal_charge.total_tax,
          totalDiscount: resNota[4].subtotal_charge.total_discount,
          totalCharge: resNota[4].subtotal_charge.total_charge,
          total: resNota[4].total_charge.total,
          amountToWord: writtenForm(resNota[4].total_charge.total),
          datePrint: new Date (Date.now()),
          balance: resNota[4].total_charge.balance,
          charge: resNota[4].charge.map(x => {
            const dataCharge = {
              date: x.date,
              nominal: x.nominal,
              particular: x.particular,
            };
            return dataCharge;
          }),
        };
        console.log('nota', resNota);
      });
    });
  }

  makePdfCheckOut() {
    html2canvas(this.content.nativeElement, <Html2Canvas.Html2CanvasOptions>{
      onrendered: function(canvas: HTMLCanvasElement) {
        const elementToPrint = document.getElementById('demo'); // The html element to become a pdf
        const pdf = new jsPDF();
        pdf.addHTML(canvas, () => {
            pdf.save('web.pdf');
        });
      },
    });
  }

}
