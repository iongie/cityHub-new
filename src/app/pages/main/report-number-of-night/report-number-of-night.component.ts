import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { DatePipe } from '@angular/common';
import { pdf, drawDOM, DrawOptions, exportPDF } from '@progress/kendo-drawing';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'ngx-report-number-of-night',
  templateUrl: './report-number-of-night.component.html',
  styleUrls: ['./report-number-of-night.component.scss']
})
export class ReportNumberOfNightComponent implements OnInit, OnDestroy {
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
  numberOfNight = [{
    businnesSourceId:0,
    businnesSourceName: '',
    guestId: 0,
    guestName: '',
    arrivalDate: '',
    departureDate: '',
    nights: 0,
    roomId: 0,
    roomName: '',
    roomTypeId: 0,
    roomTypeName: '',
    rate: 0,
    billingNumber: '',
    bookingNumber: '',
    by: '',
    entryAt: '',
    status: ''
  }];
  sortDate = {
    date: {
      start: new Date(),
      end: new Date(),
    },
  };

  hiddenContent =  true;
  userCityHub: any;
  constructor(
    public reportServ: ReportService,
    public datepipe: DatePipe,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.hiddenContent = true;
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
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

  getReportnumberOfNightList() {
    this.hiddenContent = false;
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    this.reportServ.getNumberOfNightReport(report)
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
      this.numberOfNight = res.number_of_nights.map(x => {
        const firstTextBookingNumber = x.booking_number.slice(0, 8);
        const secondTextBookingNumber = x.booking_number.slice(8, 1000);
        const datax = {
         businnesSourceId: x.business_source_id,
         businnesSourceName: x.business_source_name,
         guestId: x.guest_id,
         guestName: x.guest_name,
         arrivalDate: x.arrival_date,
         departureDate: x.departure_date,
         nights: x.nights,
         roomId: x.room_id,
         roomName: x.room_name,
         roomTypeId: x.room_type_id,
         roomTypeName: x.room_type_name,
         rate: x.rate,
         billingNumber: x.billing_number,
         bookingNumber: x.booking_number,
         firstTextBookingNumber: firstTextBookingNumber,
         secondTextBookingNumber: secondTextBookingNumber,
         by: x.by,
         entryAt: x.entry_at,
         status: x.status
        };
        return datax;
      });
    });
  }

  makePdfReportnumberOfNight(element) {
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    const margin: any = '1cm';
    const opt: DrawOptions = {
      paperSize: 'A4',
      margin: margin,
      repeatHeaders: true,
    }
    drawDOM(document.getElementById('demoReportnumberOfNight'),opt).then(data => {
      pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + '_NoOfRoomNight.pdf');
    })
  }

}
