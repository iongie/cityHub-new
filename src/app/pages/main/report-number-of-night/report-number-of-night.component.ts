import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { DatePipe } from '@angular/common';
import { pdf, drawDOM, DrawOptions, exportPDF } from '@progress/kendo-drawing';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-report-number-of-night',
  templateUrl: './report-number-of-night.component.html',
  styleUrls: ['./report-number-of-night.component.scss']
})
export class ReportNumberOfNightComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
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
  constructor(
    public reportServ: ReportService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.hiddenContent = true;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
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
      landscape: true,
      repeatHeaders: true,
    }
    drawDOM(document.getElementById('demoReportnumberOfNight'),opt).then(data => {
      pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + '_NoOfRoomNight.pdf');
    })
  }

}
