import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { MiscellaneousSalesService } from '../../../../services/miscellaneous-sales/miscellaneous-sales.service';
import { BusinessSourceService } from '../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../services/guest/guest.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { RoomTypeService } from '../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ExtraChargeService } from '../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../services/extra-charge-category/extra-charge-category.service';
import { PaymentTypeService } from '../../../../services/payment-type/payment-type.service';
import { NbDialogService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { MiscDetailById } from '../misc-sales';
import { LocalDataSource } from 'ng2-smart-table';
import { MiscellaneousSalesDetailLinkComponent } from './miscellaneous-sales-detail-link/miscellaneous-sales-detail-link.component';

@Component({
  selector: 'ngx-miscellaneous-sales-detail',
  templateUrl: './miscellaneous-sales-detail.component.html',
  styleUrls: ['./miscellaneous-sales-detail.component.scss'],
})
export class MiscellaneousSalesDetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  userCityHub: any;
  detailMiscSalesById = new MiscDetailById;
  miscSalesDetails: LocalDataSource;
  settings = {
    actions: false,
    columns: {
      extraChargeCategoryName: {
        title: 'Category extra charge',
        type: 'string',
      },
      extraChargeName: {
        title: 'Extra charge',
        type: 'string',
      },
      extraChargeRate: {
        title: 'Rate',
        type: 'string',
      },
      extraChargeDescription: {
        title: 'Description',
        type: 'string',
      },
      quantity: {
        title: 'Quantity',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'string',
      },
      subtotal: {
        title: 'Subtotal',
        type: 'string',
      },
      miscSalesDetailsStatus: {
        title: 'Status',
        type: 'string',
      },
      detail: {
        title: 'Actions',
        type: 'custom',
        renderComponent: MiscellaneousSalesDetailLinkComponent,
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
    this.viewById();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
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
        }if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        this.activeRoute.params.subscribe(params => {
          const miscSales = {
            id: params.id,
          };
          this.miscellaneousSalesServ.getMiscById(miscSales)
          .pipe(takeUntil(this.subs))
          .subscribe(resViewById => {
            console.log('resViewById', resViewById);
            this.detailMiscSalesById.miscSales = {
              miscSalesId: resViewById.misc_sales.misc_sales_id,
              guestId: resViewById.misc_sales.guest_id,
              paymentTypeId: resViewById.misc_sales.payment_type_id,
              miscSalesNumber: resViewById.misc_sales.misc_sales_number,
              miscSalesTotal: resViewById.misc_sales.misc_sales_total,
              miscSalesDate: this.datepipe.transform( resViewById.misc_sales.misc_sales_date, 'yyyy-MM-dd'),
              miscSalesNote: resViewById.misc_sales.misc_sales_note,
              miscSalesStatus: resViewById.misc_sales.misc_sales_status,
              miscSalesCreatedAt: this.datepipe.transform( resViewById.misc_sales.misc_sales_created_at, 'yyyy-MM-dd'),
              miscSalesCreatedBy: resViewById.misc_sales.misc_sales_created_by,
              miscSalesUpdatedAt: this.datepipe.transform( resViewById.misc_sales.misc_sales_updated_at, 'yyyy-MM-dd'),
              miscSalesUpdatedBy: resViewById.misc_sales.misc_sales_updated_by,
              miscSalesCancelAt: this.datepipe.transform( resViewById.misc_sales.misc_sales_cancel_at, 'yyyy-MM-dd'),
              miscSalesCancelBy: resViewById.misc_sales.misc_sales_cancel_by,
              miscSalesCancelReason: resViewById.misc_sales.misc_sales_cancel_reason,
              countryId: resViewById.misc_sales.country_id,
              guestName: resViewById.misc_sales.guest_name,
              address: resViewById.misc_sales.address,
              city: resViewById.misc_sales.city,
              email: resViewById.misc_sales.email,
              phoneNumber: resViewById.misc_sales.phone_number,
              guestFileScan: resViewById.misc_sales.guest_file_scan,
              guestCreatedAt: this.datepipe.transform( resViewById.misc_sales.guest_created_at, 'yyyy-MM-dd'),
              guestUpdatedBy: this.datepipe.transform( resViewById.misc_sales.guest_updated_at, 'yyyy-MM-dd'),
              paymentTypeName: resViewById.misc_sales.payment_type_name,
              paymentTypeDbStatus: resViewById.misc_sales.payment_type_db_status,
              countryName: resViewById.misc_sales.country_name,
            };
            const miscSalesDetails = resViewById.misc_sales_details.map(x => {
              const datax = {
                miscSalesDetailsId: x.misc_sales_details_id,
                extraChargeId: x.extra_charge_id,
                miscSalesId: x.misc_sales_id,
                quantity: x.quantity,
                price: x.price,
                subtotal: x.subtotal,
                miscSalesDetailsStatus: x.misc_sales_details_status,
                extraChargeCategoryId: x.extra_charge_category_id,
                extraChargeName: x.extra_charge_name,
                extraChargeRate: x.extra_charge_rate,
                extraChargeDescription: x.extra_charge_description,
                extraChargeStatus: x.extra_charge_status,
                createdAt: this.datepipe.transform( x.created_at, 'yyyy-MM-dd'),
                createdBy: x.created_by,
                updatedAt: this.datepipe.transform( x.updated_at, 'yyyy-MM-dd'),
                updatedBy: x.updated_by,
                extraChargeCategoryName: x.extra_charge_category_name,
                detail: {
                  id: x.misc_sales_details_id,
                  number: resViewById.misc_sales.misc_sales_number,
                },
              };
              return datax;
            });
            this.miscSalesDetails = new LocalDataSource(miscSalesDetails);
          });
        });
      });
    });
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

  goToMiscSalesManagement() {
    this.router.navigate(['pages/miscellaneous-sales']);
  }

  goToExtendMiscSales() {
    this.router.navigate(['pages/extend-miscellaneous-sales/' + this.detailMiscSalesById.miscSales.miscSalesId]);
  }

  goToNota() {
    this.router.navigate(['pages/nota-miscellaneous-sales/' + this.detailMiscSalesById.miscSales.miscSalesId]);
  }
}
