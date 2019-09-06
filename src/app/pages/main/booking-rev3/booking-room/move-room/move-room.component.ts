import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { RoomInformation } from '../../booking';
import { Subject, Observable } from 'rxjs';
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
import { takeUntil, debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-move-room',
  templateUrl: './move-room.component.html',
  styleUrls: ['./move-room.component.scss'],
})
export class MoveRoomComponent implements OnInit, OnDestroy {
  dataMoveRoom = {
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

  // ! Get Booking ID
  booking = {
    id: 0,
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
    public datepipe: DatePipe,
    public router: Router,
    public notifServ: NotificationService,
    public countryServ: CountryService,
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.detailAccount();
    this.getDataForMoveRoom();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getDataForMoveRoom() {
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

            this.booking.id = resGetBookingInformation.room_information.booking_id;
            const departureDate = new Date() // ! convert date to number (departure date)
            .setDate(new Date(resGetBookingInformation.room_information.departure_date)
            .getDate());
            const arrivalDate = new Date() // ! convert date to number (arrival date);
            .setDate(new Date(resGetBookingInformation.room_information.arrival_date)
            .getDate());
            const duration = +new Date(departureDate) - +new Date(arrivalDate);

            // ! data arrival Date and departure date
            this.dataMoveRoom.arrivalDate = new Date(resGetBookingInformation.room_information.arrival_date);
            this.dataMoveRoom.departureDate =  new Date(resGetBookingInformation.room_information.departure_date),
            this.dataMoveRoom.duration =  resGetBookingInformation.room_information.duration;

            // TODO: GET DATA check roomfrom arrival date and departure date
            this.dataMoveRoom.roomInformation = true;
            const dataCheckRoom = {
              arrivalDate: this.datepipe.transform( this.dataMoveRoom.arrivalDate, 'yyyy-MM-dd'),
              departureDate: this.datepipe.transform( this.dataMoveRoom.departureDate, 'yyyy-MM-dd'),
            };
            this.bookingServ.checkRoom(dataCheckRoom)
            .pipe(takeUntil(this.subs))
            .subscribe(resCheckRoom => {
              this.roomInformation.roomInfo = resCheckRoom.room_information.map(y => {
                const c = {
                  roomTypeId: y.room_type_id,
                  roomTypeName: y.room_type_name,
                  available: y.available,
                };
                return c;
              });
              console.log('resCHeckRoom', this.roomInformation);
            });
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

  checkRoomListBooking(event) {
    this.roomInformation.roomInfo.map((y) => {
      const yui = {
        available: y.available,
        roomTypeId: y.roomTypeId,
        roomTypeName: y.roomTypeName,
        check: event.checked,
      };
      return yui;
    });
  }

  moveRoom() {
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
            number: params.number,
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

          const dataMoveRoom = {
            bookingRoomId: bookingRoom.id,
            createdBy: this.userCityHub.name,
            roomTypeId,
            numberOfRoom,
          };

          this.bookingServ.moveRoom(dataMoveRoom)
          .pipe(takeUntil(this.subs))
          .subscribe(resAddBooking => {
            const title = 'Move Room for Booking Number: ' + params.number;
            const content = 'Move Room successfully';
            this.notifServ.showSuccessTypeToast(title, content);
            this.router.navigate(['pages/booking-detail/' +
              this.booking.id,
            ]);
          }, err => {
            const title = 'Error - Move Room for Booking Number: ' + params.number;
            const content = 'Move Room not saved';
            this.notifServ.showDangerTypeToast(title, content);
          });

        });
      });
    });
  }

  cancel() {
    this.activeRoute.params.subscribe(params => {
      const bookingRoom = {
        id: params.id,
        number: params.number,
      };

      this.router.navigate(['pages/booking-detail/' +
        bookingRoom.number +
        '/' +
        bookingRoom.id,
      ]);

    });
  }

}
