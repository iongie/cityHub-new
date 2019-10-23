import { Component, OnInit, OnDestroy  } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';
import { DatePipe } from '@angular/common';
import { Path, Text, Group, pdf, exportPDF, drawDOM, DrawOptions } from '@progress/kendo-drawing';
import { AuthService } from '../../../services/auth/auth.service';



@Component({
  selector: 'ngx-report-arrival-list',
  templateUrl: './report-arrival-list.component.html',
  styleUrls: ['./report-arrival-list.component.scss'],
})
export class ReportArrivalListComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  printProperty = {
    printDate: '',
    printName: '',
  };
  property = {
    propertyId: 0,
    countryId: 0,
    propertyName: '',
    address: '',
    city: '',
    phoneNumber: '',
    website: '',
    createdAt: '',
    createdBy: '',
    updatedAt: '',
    updatedBy: '',
    countryName: '',
  };
  arrival = [
    {
      arrivalDate: '',
      baseRate: 0,
      bookingNumber: '',
      businessSourceId: 0,
      businessSourceName: '',
      by: '',
      departureDate: '',
      entryAt: '',
      guestId: 0,
      guestName: '',
      night: '',
      roomTypeId: 0,
      roomTypeName: '',
      status: '',
    },
  ];
  sortDate = {
    date: {
      start: new Date(),
      end: new Date(),
    },
  };

  // TODO: Setting disable date for from date and to date
  min = new Date();
  max = new Date();

  hiddenContent = true ;
  userCityHub: any;
  constructor(
    public reportServ: ReportService,
    public datepipe: DatePipe,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    // this.getReportArrivalList();
    this.minMax();
    this.hiddenContent = true;
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  minMax() {
    const max = new Date()
    .setDate(new Date(Date.now())
    .getDate() + 1);
    this.max = new Date(max);
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data)
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(this.userCityHub);
    });
  }

  getReportArrivalList() {
    this.hiddenContent = false;
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    this.reportServ.getArrivalListReport(report)
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      console.log('getReportArrivalList', res);
      this.printProperty = {
        printDate: this.datepipe.transform( Date.now(), 'longDate'),
        printName: this.userCityHub.name,
      };
      this.property = {
        propertyId: res.property.property_id,
        countryId: res.property.country_id,
        propertyName: res.property.property_name,
        address: res.property.address,
        city: res.property.city,
        phoneNumber: res.property.phone_number,
        website: res.property.website,
        createdAt: res.property.created_at,
        createdBy: res.property.created_by,
        updatedAt: res.property.updated_at,
        updatedBy: res.property.updated_by,
        countryName: res.property.country_name,
      };
      this.arrival = res.arrival.map((x, index) => {
        const firstTextBookingNumber = x.booking_number.slice(0, 8);
        const secondTextBookingNumber = x.booking_number.slice(8, 1000);
        const datax = {
          no: index + 1,
          arrivalDate: x.arrival_date,
          baseRate: x.base_rate,
          bookingNumber: x.booking_number,
          firstTextBookingNumber: firstTextBookingNumber,
          secondTextBookingNumber: secondTextBookingNumber,
          businessSourceId: x.business_source_id,
          businessSourceName: x.business_source_name,
          by: x.by,
          departureDate: x.departure_date,
          entryAt: x.entry_at,
          guestId: x.guest_id,
          guestName: x.guest_name,
          nights: x.nights,
          roomTypeId: x.room_type_id,
          roomTypeName: x.room_type_name,
          status: x.status,
        };
        return datax;
      });
    });
  }

  makePdfReportArrival() {
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    const margin: any = '1cm';
    const opt: DrawOptions = {
      paperSize: 'A4',
      margin: margin,
      landscape: true,
      repeatHeaders: true,
    }
    drawDOM(document.getElementById('demoReportArrival'), opt).then(data => {
      pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + '_arrival.pdf');
    })
  }

  

}
