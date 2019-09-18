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

  // 0. Declaration Reservation
  notaReservation = {
    guestName:'',
    address:'',
    phone:'',
    email:'',
    city:'',
    country:'',
    bookingNo:'',
    bookingDate: new Date(),
    checkInDate: new Date(),
    checkOutDate: new Date(),
    datePrint: new Date(),
    source:'',
    roomType:'',
    bookingStatus:'',
    duration:'',
    discount: 0,
    roomCharge: 0,
    tax: 0,
    totalExtraCharge: 0,
    grandTotal: 0,
    user:'',
  };

// 1. Declaration Extra Charge
  notaExtraCharge = {
    roomName:'',
    guestName:'',
    address:'',
    city:'',
    country:'',
    datePrint: new Date(),
    charge: [
    {
      voucherNo:'',
      date: new Date(),
      nominal: 0,
      particular: '',
    },
      ],
    amountToWord:'',
    totalExtraCharge: 0,
    user:'',
  };

// 2. Declaration Deposit
  notaDeposit = {
    bookingNo: '',
    source:'',
    paymentType:'',
    deposit: 0,
    amountToWord: '',
    guestName:'',
    address:'',
    city:'',
    country:'',
    email:'',
    phone:'',
    arrivalDate: new Date(),
    departureDate: new Date(),
    duration: '',
    roomType:'',
    roomName:'',
    datePrint: new Date(),
    user:'',
  };
  
// 3. Declaration Check In  
  notaCheckIn = {
    bookingNo:'',
    guestName:'',
    roomName:'',
    datePrint: new Date(),
    totalCharge: 0,
    amountToWord: '',
    paymentType: '',
    checkInBy: '',
    paymentNote:'',
  };

// 4. Declaration Checkout  
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
        
        // 0. get data nota reservation
        this.notaReservation = {
          guestName: resNota[0].guest.guest_name,
          address: resNota[0].guest.address,
          phone: resNota[0].guest.phone_number,
          city: resNota[0].guest.city,
          country: resNota[0].guest.country_name,
          email: resNota[0].guest.email,
          bookingNo: resNota[0].booking.booking_number,
          bookingDate: resNota[0].booking.booking_date,
          bookingStatus: resNota[0].booking.booking_status_name,
          source: resNota[0].booking.business_source_name,
          checkInDate: resNota[0].booking.check_in,
          checkOutDate: resNota[0].booking.check_out,
          duration: resNota[0].booking.duration,
          datePrint: new Date (Date.now()),
          discount: resNota[0].charge.discount,
          grandTotal: resNota[0].charge.grand_total,
          roomCharge: resNota[0].charge.room_charge,
          totalExtraCharge: resNota[0].charge.total_extra_charge,
          tax: resNota[0].charge.total_tax,
          user: resNota[0].property.created_by,
          roomType: resNota[0].room.room_type_name,
        };
        console.log('nota', resNota); 

        // 1. get data nota extra charge
        this.notaExtraCharge = {
          roomName: resNota[1].room.room_name,
          guestName: resNota[1].guest.guest_name,
          address: resNota[1].guest.address,
          city: resNota[1].guest.city,
          country: resNota[1].guest.country_name,
          datePrint: new Date (Date.now()),
          totalExtraCharge: resNota[1].total_extra_charge.total_extra_charge,
          amountToWord: writtenForm(resNota[1].total_extra_charge.total_extra_charge),
          user: resNota[1].property.created_by,
          charge: resNota[1].charge.map(x => {
            const dataCharge = {
              voucherNo: x.ref_number,
              date: x.date,
              nominal: x.nominal,
              particular: x.particular,
            };
            return dataCharge;
          }),
        };
        console.log('nota', resNota); 

        // 2. get data nota deposit
        this.notaDeposit = {
          bookingNo: resNota[2].booking.booking_number,
          source: resNota[2].booking.business_source_name,
          paymentType: resNota[2].deposit.payment_type,
          deposit: resNota[2].deposit.total_deposit,
          amountToWord: writtenForm(resNota[2].deposit.total_deposit),
          guestName: resNota[2].guest.guest_name,
          address: resNota[2].guest.address,
          city: resNota[2].guest.city,
          country: resNota[2].guest.country_name,
          phone: resNota[2].guest.phone_number,
          email: resNota[2].guest.email,
          user: resNota[2].property.created_by,
          datePrint: new Date (Date.now()),
          roomName: resNota[2].room.room_name,
          roomType: resNota[2].room.room_type_name,
          duration: resNota[2].room.duration,
          arrivalDate: resNota[2].room.arrival_date,
          departureDate: resNota[2].room.departure_date,
        };
        console.log('nota', resNota); 

        // 3. get data nota check in
        this.notaCheckIn = {
          roomName: resNota[3].room.room_name,
          guestName: resNota[3].guest.guest_name,
          bookingNo : resNota[3].booking.booking_number,
          datePrint: new Date (Date.now()),
          checkInBy: resNota[3].room.checkin_by,
          paymentType: resNota[3].total_charge.payment_type,
          paymentNote: resNota[3].total_charge.payment_note,
          totalCharge: resNota[3].total_charge.total_charge,
          amountToWord: writtenForm(resNota[3].total_charge.total_charge),
        };
        console.log('nota', resNota); 
        
        // 4. get data nota check out
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
