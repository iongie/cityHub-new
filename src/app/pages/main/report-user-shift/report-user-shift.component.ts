import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { drawDOM, pdf } from '@progress/kendo-drawing';

@Component({
  selector: 'ngx-report-user-shift',
  templateUrl: './report-user-shift.component.html',
  styleUrls: ['./report-user-shift.component.scss']
})
export class ReportUserShiftComponent implements OnInit, OnDestroy {
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
  userShiftReport = [
    {
      date: '',
      receipt: '',
      reference: '',
      guestId: 0,
      guestName: '',
      billingNumber: '',
      roomId: 0,
      roomName: '',
      remark: '',
      category: '',
      paymentTypeId: 0,
      paymentTypeName: '',
      amount: 0,
      deskClerk: '',
    }
  ];
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

  getReportUserShiftt() {
    this.hiddenContent = false;
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    this.reportServ.getUserShiftReport(report)
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
      this.userShiftReport = res.user_shift_report.map(x => {
        const datax = {
          date: x.date,
          receipt: x.receipt,
          reference: x.reference,
          guestId: x.guest_id,
          guestName: x.guest_name,
          billingNumber: x.billing_number,
          roomId: x.room_id,
          roomName: x.room_name,
          remark: x.remark,
          category: x.category,
          paymentTypeId: x.payment_type_id,
          paymentTypeName: x.payment_type_name,
          amount: x.amount,
          deskClerk: x.desk_clerk,
        };
        return datax;
      });
    });
  }

  makePdfReportUserShift() {
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    drawDOM(document.getElementById('demoReportUserShift')).then(data => {
      pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + 'userShift.pdf');
    })
  }

}
