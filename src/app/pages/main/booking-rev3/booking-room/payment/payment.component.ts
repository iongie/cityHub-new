import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { BusinessSourceService } from '../../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../../services/guest/guest.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { PaymentLinkDetailComponent } from './payment-link-detail/payment-link-detail.component';

@Component({
  selector: 'ngx-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  payment: LocalDataSource;
  // detailBookingByBookingRoomId = new DetailBookingByBookingRoomId;
  show: any;
  forRole: any;
  @Input() value: any;
  settings = {
    actions: false,
    columns: {
      paymentNumber: {
        title: 'Payment number',
        type: 'string',
      },
      billingNumber: {
        title: 'Billing number',
        type: 'string',
      },
      rateTotal: {
        title: 'Rate total',
        type: 'string',
      },
      taxTotal: {
        title: 'Tax total',
        type: 'string',
      },
      paidTotal: {
        title: 'Paid total',
        type: 'string',
      },
      paymentCategory: {
        title: 'Payment category',
        type: 'string',
      },
      detail: {
        title: 'Actions',
        type: 'custom',
        renderComponent: PaymentLinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public bookingServ: BookingService,
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
  ) { }

  ngOnInit() {
    this.getBookingInfomationByBookingRoomId();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
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
            this.payment = new LocalDataSource(this.value.payment);

            console.log('this.value.payment', this.value.payment);
            console.log('this.payment', this.payment);
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

}
