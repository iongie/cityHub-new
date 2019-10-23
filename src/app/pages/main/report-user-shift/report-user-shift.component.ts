import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';
import { drawDOM, pdf, DrawOptions } from '@progress/kendo-drawing';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'ngx-report-user-shift',
  templateUrl: './report-user-shift.component.html',
  styleUrls: ['./report-user-shift.component.scss']
})
export class ReportUserShiftComponent implements OnInit, OnDestroy {
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
      this.userShiftReport = res.user_shift_report.map((x, index) => {
        const firstTextBookingNumber = x.billing_number.slice(0, 8);
        const secondTextBookingNumber = x.billing_number.slice(8, 1000);
        const firstTextReceipt = x.receipt.slice(0, 8);
        const secondTextReceipt = x.receipt.slice(8, 1000);
        const datax = {
          no: index + 1,
          date: x.date,
          receipt: x.receipt,
          firstTextReceipt: firstTextReceipt,
          secondTextReceipt: secondTextReceipt,
          reference: x.reference,
          guestId: x.guest_id,
          guestName: x.guest_name,
          billingNumber: x.billing_number,
          firstTextBookingNumber: firstTextBookingNumber,
          secondTextBookingNumber: secondTextBookingNumber,
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
    const margin: any = '1cm';
    const opt: DrawOptions = {
      paperSize: 'A4',
      margin: margin,
      landscape: true,
      repeatHeaders: true,
    }
    drawDOM(document.getElementById('demoReportUserShift'), opt).then(data => {
      pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + '_userShift.pdf');
    })
  }

}
