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
    propertyName:'',
    propertyAddress:'',
    propertyCity:'',
    propertyCountry:'',
    propertyWebsite:'',
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
    propertyName:'',
    propertyAddress:'',
    propertyCity:'',
    propertyCountry:'',
    propertyWebsite:'',
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
    propertyName:'',
    propertyAddress:'',
    propertyCity:'',
    propertyCountry:'',
    propertyWebsite:'',
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
    propertyName:'',
    propertyAddress:'',
    propertyCity:'',
    propertyCountry:'',
    propertyWebsite:'',
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
    propertyName:'',
    propertyAddress:'',
    propertyCity:'',
    propertyCountry:'',
    propertyWebsite:'',
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
          propertyName: resNota[0].property.property_name,
          propertyAddress: resNota[0].property.address,
          propertyCity: resNota[0].property.city,
          propertyCountry: resNota[0].property.country_name,
          propertyWebsite: resNota[0].property.website,
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
          propertyName: resNota[1].property.property_name,
          propertyAddress: resNota[1].property.address,
          propertyCity: resNota[1].property.city,
          propertyCountry: resNota[1].property.country_name,
          propertyWebsite: resNota[1].property.website,
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
          propertyName: resNota[2].property.property_name,
          propertyAddress: resNota[2].property.address,
          propertyCity: resNota[2].property.city,
          propertyCountry: resNota[2].property.country_name,
          propertyWebsite: resNota[2].property.website,
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
          propertyName: resNota[3].property.property_name,
          propertyAddress: resNota[3].property.address,
          propertyCity: resNota[3].property.city,
          propertyCountry: resNota[3].property.country_name,
          propertyWebsite: resNota[3].property.website,
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
          propertyName: resNota[4].property.property_name,
          propertyAddress: resNota[4].property.address,
          propertyCity: resNota[4].property.city,
          propertyCountry: resNota[4].property.country_name,
          propertyWebsite: resNota[4].property.website,
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

  public makePdfCheckOut()  
  {  
    var data = document.getElementById('demoCheckOut');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('doc/pdf')  
      let pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)  
      pdf.save('Nota_Check_Out.pdf'); // Generated PDF   
    });  
  }

  public makePdfReservation()  
  {  
    var data = document.getElementById('demoReservation');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('doc/pdf')  
      let pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)  
      pdf.save('Nota_Reservation.pdf'); // Generated PDF   
    });  
  }

  public makePdfCheckIn()  
  {  
    var data = document.getElementById('demoCheckIn');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('doc/pdf')  
      let pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)  
      pdf.save('Nota_Check_In.pdf'); // Generated PDF   
    });  
  }

  public makePdfDeposit()  
  {  
    var data = document.getElementById('demoDeposit');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('doc/pdf')  
      let pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)  
      pdf.save('Nota_Deposit.pdf'); // Generated PDF   
    });  
  }

  public makePdfExtraCharge()  
  {  
    var data = document.getElementById('demoExtraCharge');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('doc/pdf')  
      let pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PDF', 0, position, imgWidth, imgHeight)  
      pdf.save('Nota_Extra_Charge.pdf'); // Generated PDF   
    });  
  }

}
