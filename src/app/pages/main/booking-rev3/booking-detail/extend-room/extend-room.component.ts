import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { RoomInformation } from '../../booking';
import { Subject } from 'rxjs';
import { BusinessSourceService } from '../../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../../services/guest/guest.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../../services/room-operation/room-operation.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { CountryService } from '../../../../../services/country/country.service';
import { takeUntil } from 'rxjs/operators';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-extend-room',
  templateUrl: './extend-room.component.html',
  styleUrls: ['./extend-room.component.scss'],
})
export class ExtendRoomComponent implements OnInit, OnDestroy {
  dataExtendRoom = {
    arrivalDate: new Date(),
    departureDate: new Date(),
    duration: 0,
    createdBy: '',
    roomInformation: false,
    roomTypeId: [],
    numberOfRoom: [],
  };
  roomInformation = new RoomInformation;
  roomListBooking: any;
  userCityHub: any;
  show: any;
  forRole: any;
  public subs= new Subject();
  country: any;

  min = new Date();
  max = new Date();

  requiredRoomTypeId: any;
  constructor(
    public bookingServ: BookingService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public datepipe: DatePipe,
    public router: Router,
    public notifServ: NotificationService,
    public countryServ: CountryService,
    private activeRoute: ActivatedRoute,
    protected dateService: NbDateService<Date>,
  ) {}

  ngOnInit() {
    this.detailAccount();
    this.minMax();
    // this.min = new Date(Date.now());
    // this.max = new Date(Date.now());
    this.requiredRoomTypeId = true;
  }

  minMax() {
    const min = new Date()
    .setDate(new Date(Date.now())
    .getDate() - 1);
    this.min = new Date(min);
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

  getInfo(event) {
    this.dataExtendRoom.roomInformation = true;
    const departureDate = new Date()
    .setDate(new Date(this.dataExtendRoom.arrivalDate)
    .getDate() + +event.target.value);
    this.dataExtendRoom.departureDate = new Date(departureDate);
    const data = {
      arrivalDate: this.datepipe.transform( this.dataExtendRoom.arrivalDate, 'yyyy-MM-dd'),
      departureDate: this.datepipe.transform( this.dataExtendRoom.departureDate, 'yyyy-MM-dd'),
    };
    this.bookingServ.checkRoom(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resCheckRoom => {
      this.roomInformation.roomInfo = resCheckRoom.room_information.map(y => {
        const c = {
          roomTypeId: y.room_type_id,
          roomTypeName: y.room_type_name,
          available: y.available,
          maxAvaiable: y.available,
        };

        return c;
      });
      console.log('resCHeckRoom', this.roomInformation);
    });
  }

  checkRoomListBooking(event) {
    this.roomInformation.roomInfo.map((y) => {
      const yui = {
        maxAvaiable: y.available,
        available: y.available,
        roomTypeId: y.roomTypeId,
        roomTypeName: y.roomTypeName,
        check: event.checked,
      };
      return yui;
    });

    this.requiredRoomTypeId = false;
  }

  extendRoom() {
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
        } if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        } if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

        this.activeRoute.params.subscribe(params => {
          const booking = {
            id: params.id,
          };
          const filterRoomListBooking = this.roomInformation.roomInfo.filter((y) => {
            return y.check === true;
          });

          const roomTypeId = filterRoomListBooking.map((x) => {
            return x.roomTypeId;
          });

          const numberOfRoom = filterRoomListBooking.map((x) => {
            return x.available;
          });

          const dataExtendRoom = {
            bookingId: booking.id,
            extendFromDate: this.datepipe.transform( this.dataExtendRoom.arrivalDate, 'yyyy-MM-dd'),
            extendDuration: this.dataExtendRoom.duration,
            extendBy: this.userCityHub.name,
            roomTypeId,
            numberOfRoom,
          };

          this.bookingServ.extendRoom(dataExtendRoom)
          .pipe(takeUntil(this.subs))
          .subscribe(resAddBooking => {
            const title = 'Extend Room';
            const content = 'Extend Room successfully';
            this.notifServ.showSuccessTypeToast(title, content);
            this.router.navigate(['pages/booking-detail/' +
              booking.id,
            ]);
          }, err => {
            const title = 'Error - Extend Room';
            const content = 'Extend Room not saved';
            this.notifServ.showDangerTypeToast(title, content);
          });

        });
      });
    });
  }

  cancel() {
    this.activeRoute.params.subscribe(params => {
      const booking = {
        id: params.id,
      };

      this.router.navigate(['pages/booking-detail/' +
        booking.id,
      ]);

    });
  }
}
