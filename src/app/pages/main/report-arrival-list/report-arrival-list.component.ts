import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { takeUntil } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
import * as html2canvas from 'html2canvas';

@Component({
  selector: 'ngx-report-arrival-list',
  templateUrl: './report-arrival-list.component.html',
  styleUrls: ['./report-arrival-list.component.scss'],
})
export class ReportArrivalListComponent implements OnInit, OnDestroy {
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
  report = {
    fromDate: '2019-01-01',
    toDate: '2019-12-31',
  };
  constructor(
    public reportServ: ReportService,
  ) { }

  ngOnInit() {
    this.getReportArrivalList();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getReportArrivalList() {
    const report = {
      fromDate: '2019-01-01',
      toDate: '2019-12-31',
    };
    this.reportServ.getArrivalListReport(report)
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
      this.arrival = res.arrival.map(x => {
        const datax = {
          arrivalDate: x.arrival_date,
          baseRate: x.base_rate,
          bookingNumber: x.booking_number,
          businessSourceId: x.business_source_id,
          businessSourceName: x.business_source_name,
          by: x.by,
          departureDate: x.departure_date,
          entryAt: x.entry_at,
          guestId: x.guest_id,
          guestName: x.guest_name,
          night: x.nights,
          roomTypeId: x.room_type_id,
          roomTypeName: x.room_type_name,
          status: x.status,
        };
        return datax;
      });
    });
  }

  public makePdfReportArrival()
  // tslint:disable-next-line: one-line
  {
    const data = document.getElementById('demoReportArrival');
    html2canvas(data).then(canvas => {
      // ? Few necessary setting options
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('img/png');
      const pdf = new jsPDF ('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('report_' + this.report.fromDate + '_' + this.report.toDate + '_arrival.pdf'); // Generated PDF
    });
  }

}
