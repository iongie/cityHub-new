import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { Subject } from 'rxjs';
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
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';
import { PaymentTypeService } from '../../../../../services/payment-type/payment-type.service';
import { NbDialogService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-less-stay',
  templateUrl: './less-stay.component.html',
  styleUrls: ['./less-stay.component.scss'],
})
export class LessStayComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  show: any;
  forRole: any;
  roomTypeId = 0;
  dateStay = {
    arrivalDate: new Date(),
    departureDate: new Date(),
    duration: 0,
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
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public paymentTypeServ: PaymentTypeService,
    private dialogService: NbDialogService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.getDataForLessStay();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getDataForLessStay() {
    const data = {
      token: localStorage.getItem('p_l1oxt'), // ! get data of token in local storage
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

        // ! permission CREATE, READ, UPDATE, DELETE booking module
        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].delete_permision === 'allowed') {
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
            const departureDate = new Date() // ! convert date to number (departure date)
            .setDate(new Date(resGetBookingInformation.room_information.departure_date)
            .getDate());
            const arrivalDate = new Date() // ! convert date to number (arrival date);
            .setDate(new Date(resGetBookingInformation.room_information.arrival_date)
            .getDate());
            const duration = departureDate - arrivalDate;
            this.dateStay = { // ! data room information
              arrivalDate: new Date(resGetBookingInformation.room_information.arrival_date),
              departureDate: new Date(resGetBookingInformation.room_information.departure_date),
              duration: resGetBookingInformation.room_information.duration,
            };
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
        name : res[0].full_name, // ! for created by, updated by,
      };
    });
  }

  // TODO: Change value departure based on input data duration
  changeDeparture(event) {
    const departureDate = new Date() // ! value departure date
    .setDate(new Date(this.dateStay.arrivalDate)
    .getDate() + +event.target.value);

    this.dateStay.departureDate = new Date(departureDate);
  }

  // TODO: Process save data Add Stay
  saveLessStay() {
    this.activeRoute.params.subscribe(params => {
      const bookingRoom = {
        id: params.id,
        number: params.number,
      };
      const data = {
        bookingRoomId: bookingRoom.id,
        duration: this.dateStay.duration,
        updatedBy: this.userCityHub.name,
      };
      this.bookingServ.lessStay(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resAddStay => {
        const title = 'Less stay';
        const content = 'Less stay successfully';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/booking-detail/' +
          bookingRoom.number +
          bookingRoom.id,
        ]);
      }, err => {
        const title = 'Erro stay';
        const content = 'ERROR.Less stay successfully';
        this.notifServ.showDangerTypeToast(title, content);
        this.dateStay;
      });
    });
  }

  // TODO: back to Booking detail based on Booking Room Id
  back() {
    this.activeRoute.params.subscribe(params => {
      const bookingRoom = {
        id: params.id,
        number: params.number,
      };
      this.router.navigate(['pages/booking-detail/' +
        bookingRoom.number +
        bookingRoom.id,
      ]);
    });
  }
}
