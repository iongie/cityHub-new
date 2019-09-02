import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { DetailBookingByBookingRoomId, AddPayment } from '../../booking';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { NbDialogService } from '@nebular/theme';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { DatePipe } from '@angular/common';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentTypeService } from '../../../../../services/payment-type/payment-type.service';

@Component({
  selector: 'ngx-charge-total',
  templateUrl: './charge-total.component.html',
  styleUrls: ['./charge-total.component.scss'],
})
export class ChargeTotalComponent implements OnInit, OnDestroy {
  detailBookingByBookingRoomId = new DetailBookingByBookingRoomId;
  dataAddPaymentCharge = new AddPayment;
  public subs= new Subject();
  @Input() value: any;
  userCityHub: any;
  show: any;
  forRole: any;
  paymentType: any;
  constructor(
    private dialogService: NbDialogService,
    public bookingServ: BookingService,
    public notifServ: NotificationService,
    public datepipe: DatePipe,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
    private activeRoute: ActivatedRoute,
    public paymentTypeServ: PaymentTypeService,
  ) { }

  ngOnInit() {
    this.getBookingInfomationByBookingRoomId();
    this.detailAccount();
    this.getPaymentType();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getPaymentType() {
    const menu = {
      name: 'all',
    };
    this.paymentTypeServ.get(menu).pipe(takeUntil(this.subs)).subscribe(resPaymentType => {
      const paymentType = resPaymentType.filter((y) => {
        return y.payment_type_db_status === 'active';
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

  getBookingInfomationByBookingRoomId() {
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
          return forResUserRole.module_name === 'booking_module';
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
          const bookingRoom = {
            id: params.id,
          };
          this.bookingServ.getBookingIRoomInformation(bookingRoom)
          .pipe(takeUntil(this.subs))
          .subscribe(resGetBookingInformation => {
            this.detailBookingByBookingRoomId = this.value;
            this.dataAddPaymentCharge.totalPaid = this.value.chargeTotal.total;
            console.log('value-charge-total', this.dataAddPaymentCharge.totalPaid);
          });
        });
      });
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
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

  addPaymentCharge() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        paymentTypeId: this.dataAddPaymentCharge.paymentTypeId,
        totalPaid: this.dataAddPaymentCharge.totalPaid,
        paymentNote: this.dataAddPaymentCharge.paymentNote,
        createdBy: this.userCityHub.name,
        paymentRemark: 'charge',
      };

      this.bookingServ.payment(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resPayment => {
        const title = 'Add Payment';
        const content = 'Add Payment successfully';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'Error - Add Payment';
        const content = 'Add payment not saved';
        this.notifServ.showDangerTypeToast(title, content);
      });
    });
  }


}
