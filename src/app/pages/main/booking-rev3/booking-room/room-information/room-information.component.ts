import { Component, OnInit, Input, TemplateRef, OnDestroy } from '@angular/core';
import { DetailBookingByBookingRoomId, Room, AssignRoom } from '../../booking';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { NbDialogService } from '@nebular/theme';
import { BusinessSourceService } from '../../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../../services/guest/guest.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-room-information',
  templateUrl: './room-information.component.html',
  styleUrls: ['./room-information.component.scss'],
})
export class RoomInformationComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  detailBookingByBookingRoomId = new DetailBookingByBookingRoomId;
  show: any;
  forRole: any;
  @Input() value: any;
  room = new Room;
  assignRoom = new AssignRoom;
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
    public dialogService: NbDialogService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.getBookingInfomationByBookingRoomId();
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
            this.detailBookingByBookingRoomId.roomInformation = {
              bookingRoomId: resGetBookingInformation.room_information.booking_room_id,
              bookingId: resGetBookingInformation.room_information.booking_id,
              roomTypeId: resGetBookingInformation.room_information.room_type_id,
              roomTypeName: resGetBookingInformation.room_information.room_type_name,
              roomId: resGetBookingInformation.room_information.room_id,
              bookingRoomStatusId: resGetBookingInformation.room_information.booking_room_status_id,
              arrivalDate: resGetBookingInformation.room_information.arrival_date,
              departureDate: resGetBookingInformation.room_information.departure_date,
              checkInAt: resGetBookingInformation.room_information.checkin_at,
              checkInBy: resGetBookingInformation.room_information.checkin_by,
              checkOutBy: resGetBookingInformation.room_information.checkout_by,
              cancelAt: resGetBookingInformation.room_information.cancel_at,
              cancelBy: resGetBookingInformation.room_information.cancel_by,
              baseAdult: resGetBookingInformation.room_information.base_adult,
              baseChild: resGetBookingInformation.room_information.base_child,
              maxAdult: resGetBookingInformation.room_information.max_adult,
              maxChild: resGetBookingInformation.room_information.max_child,
              baseRate: resGetBookingInformation.room_information.base_rate,
              increaseRate: resGetBookingInformation.room_information.increase_rate,
              totalRoom: resGetBookingInformation.room_information.total_room,
              roomDescription: resGetBookingInformation.room_information.room_description,
              createdAt: resGetBookingInformation.room_information.created_at,
              createdBy: resGetBookingInformation.room_information.created_by,
              updatedAt: resGetBookingInformation.room_information.updated_at,
              updatedBy: resGetBookingInformation.room_information.update_by,
              bookingRoomStatusName: resGetBookingInformation.room_information.booking_room_status_name,
            };

            const dataRoomTypeId = {
              id: this.detailBookingByBookingRoomId.roomInformation.roomTypeId,
            };
            this.roomOperationServ.getByRoomTypeIdAndRoomStatus(dataRoomTypeId)
            .pipe(takeUntil(this.subs))
            .subscribe(resGetRoom => {
              console.log('[resGetRoom]', resGetRoom);
              this.room = resGetRoom.map(x => {
                const p = {
                  createdAt: x.created_at,
                  createdBy: x.created_by,
                  floorId: x.floor_id,
                  roomDbStatus: x.room_db_status,
                  roomId: x.room_id,
                  roomName: x.room_name,
                  roomStatusId: x.room_statusId,
                  roomTypeId: x.room_type_id,
                  updatedAt: x.updated_at,
                  updatedBy: x.updated_by,
                };
                return p;
              });
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


  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  addAssignRoom() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        roomId: this.assignRoom.roomId,
      };
      this.bookingServ.assignRoom(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resAssignRoom => {
        const title = 'Add Room';
        const content = 'Add Room successfully';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'Error - Add Room';
        const content = 'Add Room not saved';
        this.notifServ.showDangerTypeToast(title, content);
      });
    });
  }
}
