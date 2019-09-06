import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../../../../services/booking-rev3/booking.service';
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
import { Subject } from 'rxjs';
import { DetailBookingByBookingId } from '../booking';
import { takeUntil } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss'],
})
export class BookingDetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  roomInformation: LocalDataSource;
  detailBookingByBookingId = new DetailBookingByBookingId;
  show: any;
  forRole: any;
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
    this.getBookingInfomation();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getBookingInfomation() {
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
          const booking = {
            id: params.id,
          };
          this.bookingServ.getBookingInformation(booking)
          .pipe(takeUntil(this.subs))
          .subscribe(resGetBookingInformation => {
            this.detailBookingByBookingId.bookingInformation = {
              bookingId: resGetBookingInformation.booking_information.booking_id,
              guestId: resGetBookingInformation.booking_information.guest_id,
              bookingStatusId: resGetBookingInformation.booking_information.booking_status_id,
              businessSourceId: resGetBookingInformation.booking_information.business_source_id,
              bookingNumber: resGetBookingInformation.booking_information.booking_number,
              bookingCreatedAt: resGetBookingInformation.booking_information.booking_created_at,
              bookingCreatedBy: resGetBookingInformation.booking_information.booking_created_by,
              bookingUpdatedAt: resGetBookingInformation.booking_information.booking_updated_at,
              bookingUpdatedBy: resGetBookingInformation.booking_information.booking_updated_by,
              cancelAt: resGetBookingInformation.booking_information.cancel_at,
              cancelBy: resGetBookingInformation.booking_information.cancel_by,
              cancelReason: resGetBookingInformation.booking_information.cancel_reason,
              countryId: resGetBookingInformation.booking_information.country_id,
              guestName: resGetBookingInformation.booking_information.guest_name,
              address: resGetBookingInformation.booking_information.address,
              city: resGetBookingInformation.booking_information.city,
              email: resGetBookingInformation.booking_information.email,
              phoneNumber: resGetBookingInformation.booking_information.phone_number,
              guestFileScan: resGetBookingInformation.booking_information.guest_file_scan,
              guestCreatedAt: resGetBookingInformation.booking_information.guest_created_at,
              businessSourceName: resGetBookingInformation.booking_information.business_source_name,
              businessSourceDescription: resGetBookingInformation.booking_information.business_source_description,
              businessSourceCreatedAt: resGetBookingInformation.booking_information.business_source_created_at,
              bookingStatusName: resGetBookingInformation.booking_information.booking_status_name,
              guestUpdatedAt: resGetBookingInformation.booking_information.guest_updated_at,
              businessSourceUpdatedAt: resGetBookingInformation.booking_information.business_source_updated_at,
            };
            this.detailBookingByBookingId.chargeTotal = {
              discountTotal: resGetBookingInformation.charge_total.discount_total,
              rateTotal: resGetBookingInformation.charge_total.rate_total,
              taxTotal: resGetBookingInformation.charge_total.tax_total,
              total: resGetBookingInformation.charge_total.total,
            };
            this.detailBookingByBookingId.roomInformation = resGetBookingInformation.room_information.map(y => {
              const dataMapRoomInformation = {
                bookingRoomId: y.booking_room_id,
                bookingId: y.booking_id,
                bookingRoomTypeId: y.room_type_id,
                roomId: y.room_id,
                bookingRoomStatusId: y.booking_room_status_id,
                roomTypeName: y.room_type_name,
                baseAdult: y.base_adult,
                baseChild: y.base_child,
                maxAdult: y.max_adult,
                maxChild: y.max_child,
                baseRate: y.base_rate,
                increaseRate: y.increase_rate,
                totalRoom: y.total_room,
                roomDescription: y.room_description,
                createdAt: y.created_at,
                updatedAt: y.updated_at,
                arrivalDate: y.arrival_date,
                departureDate: y.departure_date,
                checkInAt: y.checkin_at,
                checkInBy: y.checkin_by,
                checkOutBy: y.checkout_by,
                cancelAt: y.cancel_at,
                cancelBy: y.cancel_by,
                createdBy: y.created_by,
                updatedBy: y.updated_by,
                detail: {
                  id: y.booking_room_id,
                  number: resGetBookingInformation.booking_information.booking_number,
                },
              };
              return dataMapRoomInformation;
            });
            this.roomInformation = new LocalDataSource(this.detailBookingByBookingId.roomInformation);
            console.log('[detailBooking by Booking id]', this.detailBookingByBookingId.bookingInformation);
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

  // TODO : Go To Extend Room
  goToExtendRoom() {
    this.activeRoute.params.subscribe(params => {
      const booking = {
        id: params.id,
      };

      this.router.navigate(['/pages/extend-room/' + booking.id]);
    });
  }
}
