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
import { Guest, Source } from '../../booking-rev3/booking';
import { takeUntil, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-add-miscellaneous-sales',
  templateUrl: './add-miscellaneous-sales.component.html',
  styleUrls: ['./add-miscellaneous-sales.component.scss'],
})
export class AddMiscellaneousSalesComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  addDataMiscSales = {
    guestId: 0,
    paymentTypeId: 0,
    miscSalesDate: new Date(),
    miscSalesNote: '',
    createdBy: '',
    extraChargeId: [],
    qty: [],
  };
  guest: any;
  modelGuest: any;
  guestt = new Guest;
  source = new Source;

  // TODO:  setting country
  country: any;

  // TODO: User for createdBy or UpdatedBy
  userCityHub: any;

  // TODO: Setting Role
  show: any;
  forRole: any;

  paymentType: any;

  // TODO: Setting disable date for arrival date and departure date
  min = new Date();
  max = new Date();

  // TODO: Setting for upload
  fileData = new FormData();
  reader = new FileReader();
  selectedFile: File = null;
  imgURL: any;

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
  selectExtraCharge = [];

  requiredPhoto: any;
  requiredPaymentType: any;
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
    this.formSelectExtraCharge();
    console.log('selectExtraCharge', this.selectExtraCharge);
    this.getExtraCharge();
    this.detailAccount();
    this.getGuest();
    this.getCountry();
    this.getPaymentType();
    this.imgURL = '../../../../../assets/images/placeholder.jpg';
    this.requiredPhoto = true;
    this.requiredPaymentType = false;
  }

  formSelectExtraCharge() {
    this.arrayExtraCharge = {
      id: 0,
      qty: 1,
    };
    this.selectExtraCharge.push(this.arrayExtraCharge);
  }

  addFormSelectExtraCharge() {
    this.arrayExtraCharge = {
      id: 0,
      qty: 1,
    };
    this.selectExtraCharge.push(this.arrayExtraCharge);
    console.log('selectExtraCharge', this.selectExtraCharge);
  }

  removeFormSelectExtraCharge(index) {
    if (index !== 0) {
      this.selectExtraCharge.splice(index);
    }
    console.log('selectExtraCharge', this.selectExtraCharge);
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
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

  // TODO: GET Guest
  getGuest() {
    this.guestServ.get().pipe(takeUntil(this.subs)).subscribe(resGuest => {
      this.guest = resGuest.map((forResGuest) => {
        const dataResGuest = {
          guestId: forResGuest.guest_id,
          countryId: forResGuest.country_id,
          guestName: forResGuest.guest_name,
          address: forResGuest.address,
          city: forResGuest.city,
          email: forResGuest.email,
          phoneNumber: forResGuest.phone_number,
          guestFileScan: forResGuest.guest_file_scan,
        };
        return dataResGuest;
      });
      console.log(this.guest);
    });
  }

  searchGuest = (textGuest: Observable<string>) => textGuest
  .pipe(
    debounceTime(200),
    map(term => term === '' ? [] : this.guest
    .filter(v => v.guestName
      .toLowerCase()
      .indexOf(term
        .toLowerCase()) > -1)
        .slice(0, 10)),
    )
  formatterGuest = (x: {guestName: string}) => x.guestName;

  onChangeGuest(event) {
    if (event === '') {
      this.guestt = {
        guestId: 0,
        guestName: '',
        countryId: '',
        address: '',
        city: '',
        phoneNumber: '',
        guestFileScan: '',
        email: '',
      };
    } else {
      this.guestt = {
        guestId: event.guestId,
        guestName: event.guestName,
        countryId: event.countryId,
        address: event.address,
        city: event.city,
        email: event.email,
        phoneNumber: event.phoneNumber,
        guestFileScan: event.guestFileScan,
      };
      this.imgURL = event.guestFileScan;
      this.requiredPhoto = false;
    }
  }

  getCountry() {
    this.countryServ.get().pipe(takeUntil(this.subs)).subscribe(resCountry => {
      this.country = resCountry.map((y) => {
        const xyz = {
          countryId: y.country_id,
          countryName: y.country_name,
        };
        return xyz;
      });
    });
  }

  // TODO: GET payment type
  getPaymentType() {
    const menu = {
      name: 'all',
    };
    this.paymentTypeServ.get(menu).pipe(takeUntil(this.subs)).subscribe(resPaymentType => {
      const paymentType = resPaymentType.filter((y) => {
        return y.payment_type_db_status === 'active'; // ! filter payment type
      });
      this.paymentType = paymentType.map((y) => {
        const iop = {
          paymentTypeId: y.payment_type_id,
          paymentTypeName: y.payment_type_name,
          paymentTypeDbStatus: y.payment_type_db_status,
        };
        return iop;
      });
    });
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

  onFile(event) {
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
    this.reader.readAsDataURL(this.selectedFile);
    this.reader.onload = (_event) => {
      this.imgURL = this.reader.result;
    };
  }

  addMiscSales() {
    const extraChargeId = this.selectExtraCharge.map(x => {
      return x.id.extraChargeId;
    });
    const qty = this.selectExtraCharge.map(x => {
      return x.qty;
    });
    const data = {
      guestId: this.guestt.guestId,
      paymentTypeId: this.addDataMiscSales.paymentTypeId,
      miscSalesDate: this.datepipe.transform( this.addDataMiscSales.miscSalesDate, 'yyyy-MM-dd'),
      miscSalesNote: this.addDataMiscSales.miscSalesNote,
      createdBy: this.userCityHub.name,
      extraChargeId,
      qty,
    };
    this.miscellaneousSalesServ.addMisc(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resAddMiscSales => {
      const titleNull = 'Add Miscellaneous Sales';
      const contentNull = 'Add Miscellaneous Sales successfully';
      this.notifServ.showSuccessTypeToast(titleNull, contentNull);
      this.router.navigate(['pages/detail-miscellaneous-sales/' + resAddMiscSales.misc_sales.misc_sales_id]);
    }, err => {
      const titleNull = 'Error: Add Miscellaneous Sales';
      const contentNull = 'Add Miscellaneous Sales not successfully';
      this.notifServ.showDangerTypeToast(titleNull, contentNull);
      this.router.navigate(['pages/miscellaneous-sales']);
    });
  }

}
