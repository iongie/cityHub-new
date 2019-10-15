import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ReportService } from '../../../services/report/report.service';
import { DatePipe } from '@angular/common';
import { drawDOM, pdf, DrawOptions, exportPDF } from '@progress/kendo-drawing';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-report-daily',
  templateUrl: './report-daily.component.html',
  styleUrls: ['./report-daily.component.scss']
})
export class ReportDailyComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  printProperty = {
    printDate: '',
    reportName: '',
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

  roomRavenue = {
    today: {
      roomName: 0,
      discount: 0,
      tax: 0,
      total: 0,
    },
    month: {
      roomName: 0,
      discount: 0,
      tax: 0,
      total: 0,
    },
    year: {
      roomName: 0,
      discount: 0,
      tax: 0,
      total: 0,
    }
  };

  extraCharge = {
    today: {
      extraCharge: 0,
      total: 0,
    },
    month: {
      extraCharge: 0,
      total: 0,
    },
    year: {
      extraCharge: 0,
      total: 0,
    }
  };

  miscSales = {
    today: {
      miscSales: 0,
      total: 0,
    },
    month: {
      miscSales: 0,
      total: 0,
    },
    year: {
      miscSales: 0,
      total: 0,
    }
  };

  paymentInformation = {
    today: [
      {
        paymentInformation: '',
        nominal: 0,
      }
    ],
    month: [
      {
        paymentInformation: '',
        nominal: 0,
      }
    ],
    year:  [
      {
        paymentInformation: '',
        nominal: 0,
      }
    ],
  };

  roomSummary = {
    noOfBooking: {
      today : 0,
      month: 0,
      year: 0,
    },
    soldRoom: {
      today : 0,
      month: 0,
      year: 0,
    },
    averageGuestPerNights: {
      today : 0,
      month: 0,
      year: 0,
    },
    noShowRooms: {
      today : 0,
      month: 0,
      year: 0,
    },
    totalAvailableRoomNights: {
      today : 0,
      month: 0,
      year: 0,
    },
  };

  statisctics= {
    occupancyRate: {
        today: 0,
        month: 1,
        year: 1,
    },
    averageRevenuePerRoom: {
      today: 0,
      month: 0,
      year: 0,
    },
  };
  
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
    this.getReportnumberOfNightList();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getReportnumberOfNightList() {
    this.hiddenContent = false;
    // const report = {
    //   fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
    //   toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    // };
    this.reportServ.getReportDaily()
    .pipe(takeUntil(this.subs))
    .subscribe(res => {
      console.log('getReportArrivalList', res);
      this.printProperty = {
        printDate: res.print_properties.print_date,
        reportName: res.print_properties.report_name,
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

      this.roomRavenue = {
        today: {
          roomName: res.room_revenue.today.room_name,
          discount: res.room_revenue.today.discount,
          tax: res.room_revenue.today.tax,
          total: res.room_revenue.today.total,
        },
        month: {
          roomName: res.room_revenue.month.room_name,
          discount: res.room_revenue.month.discount,
          tax: res.room_revenue.month.tax,
          total: res.room_revenue.month.total,
        },
        year: {
          roomName: res.room_revenue.year.room_name,
          discount: res.room_revenue.year.discount,
          tax: res.room_revenue.year.tax,
          total: res.room_revenue.year.total,
        }
      };

      this.extraCharge = {
        today: {
          extraCharge: res.extra_charge.today.extra_charge,
          total: res.extra_charge.today.total,
        },
        month: {
          extraCharge: res.extra_charge.month.extra_charge,
          total: res.extra_charge.month.total,
        },
        year: {
          extraCharge: res.extra_charge.year.extra_charge,
          total: res.extra_charge.year.total,
        }
      };

      this.miscSales = {
        today: {
          miscSales: res.misc_sales.today.miscSales,
          total: res.misc_sales.today.total,
        },
        month: {
          miscSales: res.misc_sales.month.miscSales,
          total: res.misc_sales.month.total,
        },
        year: {
          miscSales: res.misc_sales.year.miscSales,
          total: res.misc_sales.year.total,
        }
      };

      this.paymentInformation.today = res.payment_information.today.map(x => {
        const datax = {
          paymentInformation: x.payment_information,
          nominal: x.nominal,
        };
        return datax;
      });

      this.paymentInformation.month = res.payment_information.month.map(x => {
        const datax = {
          paymentInformation: x.payment_information,
          nominal: x.nominal,
        };
        return datax;
      });

      this.paymentInformation.year = res.payment_information.year.map(x => {
        const datax = {
          paymentInformation: x.payment_information,
          nominal: x.nominal,
        };
        return datax;
      });

      this.roomSummary = {
        noOfBooking: {
          today : res.room_summary.no_of_booking.today,
          month: res.room_summary.no_of_booking.month,
          year: res.room_summary.no_of_booking.year,
        },
        soldRoom: {
          today : res.room_summary.sold_room.today,
          month: res.room_summary.sold_room.month,
          year: res.room_summary.sold_room.year,
        },
        averageGuestPerNights: {
          today : res.room_summary.average_guest_per_nights.today,
          month: res.room_summary.average_guest_per_nights.month,
          year: res.room_summary.average_guest_per_nights.year,
        },
        noShowRooms: {
          today : res.room_summary.no_show_rooms.today,
          month: res.room_summary.no_show_rooms.month,
          year: res.room_summary.no_show_rooms.year,
        },
        totalAvailableRoomNights: {
          today : res.room_summary.total_available_room_nights.today,
          month: res.room_summary.total_available_room_nights.month,
          year: res.room_summary.total_available_room_nights.year,
        },
      };

      this.statisctics= {
        occupancyRate: {
            today: res.statisctics.occupancy_rate.today,
            month: res.statisctics.occupancy_rate.month,
            year: res.statisctics.occupancy_rate.year,
        },
        averageRevenuePerRoom: {
          today: res.statisctics.average_revenue_per_room.today,
          month: res.statisctics.average_revenue_per_room.month,
          year: res.statisctics.average_revenue_per_room.year,
        },
      };
    });
  }

  makePdfReportDaily(element) {
    const report = {
      fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
      toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    };
    const opt: DrawOptions = {
      paperSize: 'A4',
    }
    drawDOM(document.getElementById('demoReportDaily'), opt).then(data => {
      pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + 'daily.pdf');
    })
    // const report = {
    //   fromDate: this.datepipe.transform( this.sortDate.date.start, 'yyyy-MM-dd'),
    //   toDate: this.datepipe.transform( this.sortDate.date.end, 'yyyy-MM-dd'),
    // };
    // drawDOM(document.getElementById('demoReportDaily')).then(data => {
    //   pdf.exportPDF(data).then
    //   pdf.saveAs(data, 'report_' + report.fromDate + '_' + report.toDate + 'daily.pdf');
    // })
  }



}
