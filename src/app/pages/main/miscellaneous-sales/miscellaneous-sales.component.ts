import { Component, OnInit, OnDestroy } from '@angular/core';
import { BusinessSourceService } from '../../../services/business-source/business-source.service';
import { GuestService } from '../../../services/guest/guest.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ExtraChargeService } from '../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../services/extra-charge-category/extra-charge-category.service';
import { PaymentTypeService } from '../../../services/payment-type/payment-type.service';
import { NbDialogService } from '@nebular/theme';
import { Subject, Observable, of } from 'rxjs';
import { MiscellaneousSalesService } from '../../../services/miscellaneous-sales/miscellaneous-sales.service';
import { LocalDataSource } from 'ng2-smart-table';
import { takeUntil, filter, map } from 'rxjs/operators';
import { MiscellaneousSalesLinkComponent } from './miscellaneous-sales-link/miscellaneous-sales-link.component';

@Component({
  selector: 'ngx-miscellaneous-sales',
  templateUrl: './miscellaneous-sales.component.html',
  styleUrls: ['./miscellaneous-sales.component.scss'],
})
export class MiscellaneousSalesComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  sortDateMisc = {
    fromDate: new Date(),
    toDate: new Date(),
  };
  miscSales: LocalDataSource;
  forRole: any;
  show: any;
  userCityHub: any;
  settings = {
    actions: false,
    columns: {
      miscSalesNumber: {
        title: 'Miscellaneous sales number',
        type: 'string',
      },
      guestName: {
        title: 'Guest name',
        type: 'string',
      },
      paymentTypeName: {
        title: 'Pyament Type name',
        type: 'string',
      },
      miscSalesStatus: {
        title: 'Status',
        type: 'string',
      },
      detail: {
        title: 'Actions',
        type: 'custom',
        renderComponent: MiscellaneousSalesLinkComponent,
        filter: false,
      },
    },
  };
  constructor(
    public miscellaneousSalesServ: MiscellaneousSalesService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public countryServ: CountryService,
    public datepipe: DatePipe,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public paymentTypeServ: PaymentTypeService,
    private dialogService: NbDialogService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.defaultGetMiscSales();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  goToAddMiscSales() {
    this.router.navigate(['pages/add-miscellaneous-sales']);
  }

  defaultGetMiscSales() {
    const datae = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(datae).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        // tslint:disable-next-line: no-shadowed-variable
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'misc_sales_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        // TODO: GET Misc Sales

        this.sortDateMisc.fromDate = new Date(Date.now());
        this.sortDateMisc.toDate = new Date(Date.now());
        const date = {
          fromDate: this.datepipe.transform( this.sortDateMisc.fromDate, 'yyyy-MM-dd'),
          toDate: this.datepipe.transform( this.sortDateMisc.toDate, 'yyyy-MM-dd'),
        };


        this.miscellaneousSalesServ.getMiscRangeDate(date)
        .pipe(takeUntil(this.subs))
        .subscribe( resGetMiscSales => {
          // TODO: GET Data payment type
          const dataPayment = {
            name: 'all',
          };
          this.paymentTypeServ.get(dataPayment)
          .pipe(takeUntil(this.subs))
          .subscribe(resPaymentType => {
            // TODO: GET Data Guest
              this.guestServ.get()
              .pipe(takeUntil(this.subs))
              .subscribe(resGuest => {
                const data = resGetMiscSales.map(x => {
                  const filterGuest = resGuest.filter(y => {
                    return x.guest_id = y.guest_id;
                  });
                  const filterPaymentType = resPaymentType.filter(y => {
                    return x.payment_type_id = y.payment_type_id;
                  });
                  const xt = {
                    miscSalesId: x.misc_sales_id,
                    guestId: x.guest_id,
                    guestName: filterGuest[0].guest_name,
                    paymentTypeId: x.payment_type_id,
                    paymentTypeName: filterPaymentType[0].payment_type_name,
                    miscSalesNumber: x.misc_sales_number,
                    miscSalesSalesTotal: x.misc_sales_total,
                    miscSalesDate: x.misc_sales_date,
                    miscSalesNote: x.misc_sales_note,
                    miscSalesStatus: x.misc_sales_status,
                    miscSalesCreatedAt: x.misc_sales_created_at,
                    miscSalesCreatedBy: x.misc_sales_created_by,
                    miscSalesUpdateAt: x.misc_sales_updated_at,
                    miscSalesUpdatedBy: x.misc_sales_updated_by,
                    miscSalesCancelAt: x.misc_sales_cancel_at,
                    miscSalesCancelBy: x.misc_sales_cancel_by,
                    miscSalesCancelReason: x.misc_sales_cancel_reason,
                    detail: {
                      id: x.misc_sales_id,
                      number: x.misc_sales_number,
                    },
                  };
                  return xt;
              });
              this.miscSales = new LocalDataSource(data);
              console.log('resGetMiscSales', data );
            });
          });
        });
      });
    });
  }

  refresh() {
    this.miscellaneousSalesServ.refresh.subscribe(() => {
      this.defaultGetMiscSales();
    });
  }

  filterGetMiscSales() {
    const datae = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(datae).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        // tslint:disable-next-line: no-shadowed-variable
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'misc_sales_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        // TODO: GET Misc Sales
        const date = {
          fromDate: this.datepipe.transform( this.sortDateMisc.fromDate, 'yyyy-MM-dd'),
          toDate: this.datepipe.transform( this.sortDateMisc.toDate, 'yyyy-MM-dd'),
        };


        this.miscellaneousSalesServ.getMiscRangeDate(date)
        .pipe(takeUntil(this.subs))
        .subscribe( resGetMiscSales => {
          // TODO: GET Data payment type
          const dataPayment = {
            name: 'all',
          };
          this.paymentTypeServ.get(dataPayment)
          .pipe(takeUntil(this.subs))
          .subscribe(resPaymentType => {
            // TODO: GET Data Guest
              this.guestServ.get()
              .pipe(takeUntil(this.subs))
              .subscribe(resGuest => {
                const data = resGetMiscSales.map(x => {
                  const filterGuest = resGuest.filter(y => {
                    return x.guest_id = y.guest_id;
                  });
                  const filterPaymentType = resPaymentType.filter(y => {
                    return x.payment_type_id = y.payment_type_id;
                  });
                  const xt = {
                    miscSalesId: x.misc_sales_id,
                    guestId: x.guest_id,
                    geestName: filterGuest[0].guest_name,
                    paymentTypeId: x.payment_type_id,
                    paymentTypeName: filterPaymentType[0].payment_type_name,
                    miscSales: x.misc_sales_number,
                    miscSalesSalesTotal: x.misc_sales_total,
                    miscSalesDate: x.misc_sales_date,
                    miscSalesNote: x.misc_sales_note,
                    miscSalesStatus: x.misc_sales_status,
                    miscSalesCreatedAt: x.misc_sales_created_at,
                    miscSalesCreatedBy: x.misc_sales_created_by,
                    miscSalesUpdateAt: x.misc_sales_updated_at,
                    miscSalesUpdatedBy: x.misc_sales_updated_by,
                    miscSalesCancelAt: x.misc_sales_cancel_at,
                    miscSalesCancelBy: x.misc_sales_cancel_by,
                    miscSalesCancelReason: x.misc_sales_cancel_reason,
                  };
                  return xt;
              });
              this.miscSales = new LocalDataSource(data);
              console.log('resGetMiscSales', data );
            });
          });
        });
      });
    });
  }

}
