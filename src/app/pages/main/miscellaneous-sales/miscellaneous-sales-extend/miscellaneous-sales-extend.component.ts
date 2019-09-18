import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
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
import { takeUntil, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-miscellaneous-sales-extend',
  templateUrl: './miscellaneous-sales-extend.component.html',
  styleUrls: ['./miscellaneous-sales-extend.component.scss'],
})
export class MiscellaneousSalesExtendComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  extendDataMiscSales = {
    extraChargeId: 0,
    qty: 0,
  };

  // TODO : setting extra charge Dynamic form
  extraCharge: any;
  extraCharges = {
    createAt: '',
    createBy: '',
    extraChargeCategoryId: 0,
    extraChargeCategoryName: '',
    extraChargeId: 0,
    extraChargeName: '',
    extraChargeRate: '',
    extraChargeStatus: '',
    uploadAt: '',
    uploadBy: '',
  };
  modelExtraCharge: any;
  arrayExtraCharge = {
    id: 0,
    qty: 0,
  };

  userCityHub: any;
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
    this.getExtraCharge();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // TODO: GET extra charge
  getExtraCharge() {
    this.extraChargeServ.getActive().pipe(takeUntil(this.subs)).subscribe(resExtraCharge => {
      this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraChargeCategory => {
        const data = resExtraCharge.map((y) => {
          const abc = resExtraChargeCategory.filter((z) => {
            return z.extra_charge_category_id === y.extra_charge_category_id;
          });
          const xyz = {
            createAt: y.created_at,
            createBy: y.created_by,
            extraChargeCategoryId: y.extra_charge_category_id,
            extraChargeCategoryName: abc[0].extra_charge_category_name,
            extraChargeId: y.extra_charge_id,
            extraChargeName: y.extra_charge_name,
            extraChargeRate: y.extra_charge_rate,
            extraChargeStatus: y.extra_charge_status,
            uploadAt: y.updated_at,
            uploadBy: y.updated_by,
          };
          return xyz;
        });
        this.extraCharge = data;
      });
    }, err => {

    });
  }

  searchExtraCharge = (textGuest: Observable<string>) => textGuest
  .pipe(
    debounceTime(200),
    map(term => term === '' ? [] : this.extraCharge
    .filter(v => v.extraChargeName
      .toLowerCase()
      .indexOf(term
        .toLowerCase()) > -1)
        .slice(0, 10)),
    )
  formatterExtraCharge = (x: {extraChargeName: string}) => x.extraChargeName;

  onChangeExtraCharge(event) {
    if (event === '') {
      this.extraCharges = {
        createAt: '',
        createBy: '',
        extraChargeCategoryId: 0,
        extraChargeCategoryName: '',
        extraChargeId: 0,
        extraChargeName: '',
        extraChargeRate: '',
        extraChargeStatus: '',
        uploadAt: '',
        uploadBy: '',
      };
    } else {
      this.extraCharges = {
        createAt: event.createAt,
        createBy: event.createBy,
        extraChargeCategoryId: event.extraChargeCategoryId,
        extraChargeCategoryName: event.extraChargeCategoryName,
        extraChargeId: event.extraChargeId,
        extraChargeName: event.extraChargeName,
        extraChargeRate: event.extraChargeRate,
        extraChargeStatus: event.extraChargeStatus,
        uploadAt: event.uploadAt,
        uploadBy: event.uploadBy,
      };
    }
  }

  // TODO: GET user
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

  extendMiscSales() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        miscSalesId: params.id,
        updatedBy: this.userCityHub.name,
        extraChargeId: this.extraCharges.extraChargeId,
        qty: this.extendDataMiscSales.qty,
      };
      this.miscellaneousSalesServ.extendMisc(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resAddMiscSales => {
        const titleNull = 'Extend Miscellaneous Sales';
        const contentNull = 'Extend Miscellaneous Sales successfully';
        this.notifServ.showSuccessTypeToast(titleNull, contentNull);
        this.router.navigate(['pages/detail-miscellaneous-sales/' + params.id]);
      }, err => {
        const titleNull = 'Error: Extend Miscellaneous Sales';
        const contentNull = 'Extend Miscellaneous Sales not successfully';
        this.notifServ.showDangerTypeToast(titleNull, contentNull);
        this.router.navigate(['pages/miscellaneous-sales']);
      });
    });
  }

  back() {
    this.activeRoute.params.subscribe(params => {
      this.router.navigate(['pages/detail-miscellaneous-sales/' + params.id]);
    });
  }

}
