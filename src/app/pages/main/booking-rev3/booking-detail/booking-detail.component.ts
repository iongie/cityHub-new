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

@Component({
  selector: 'ngx-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  detailBookingByBookingId = new DetailBookingByBookingId;
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
    this.activeRoute.params.subscribe(params => {
      const booking = {
        id: params.id,
      };

      this.bookingServ.getBookingInformation(booking)
      .pipe(takeUntil(this.subs))
      .subscribe(res => {
        this.detailBookingByBookingId.bookingInformation = {
          bookingId: res.booking_information.booking_id,
          guestId: res.booking_information.guest_id,
          bookingStatusId: res.booking_information.booking_status_id,
          businessSourceId: res.booking_information.business_source_id,
          bookingNumber: res.booking_information.booking_number,
          bookingCreatedAt: res.booking_information.booking_created_at,
          bookingCreatedBy: res.booking_information.booking_created_by,
          bookingUpdatedAt: res.booking_information.booking_updated_at,
          bookingUpdatedBy: res.booking_information.booking_updated_by,
          cancelAt: res.booking_information.cancel_at,
          cancelBy: res.booking_information.cancel_by,
          cancelReason: res.booking_information.cancel_reason,
          countryId: res.booking_information.country_id,
          guestName: res.booking_information.guest_name,
          address: res.booking_information.address,
          city: res.booking_information.city,
          email: res.booking_information.email,
          phoneNumber: res.booking_information.phone_number,
          guestFileScan: res.booking_information.guest_file_scan,
          guestCreatedAt: res.booking_information.guest_created_at,
          businessSourceName: res.booking_information.business_source_name,
          businessSourceDescription: res.booking_information.business_source_description,
          businessSourceCreatedAt: res.booking_information.business_source_created_at,
          bookingStatusName: res.booking_information.booking_status_name,
          guestUpdatedAt: res.booking_information.guest_updated_at,
          businessSourceUpdatedAt: res.booking_information.business_source_updated_at,
        };
        this.detailBookingByBookingId.chargeTotal = {
          discountTotal: res.charge_total.discount_total,
          rateTotal: res.charge_total.rate_total,
          taxTotal: res.charge_total.tax_total,
          total: res.charge_total.total,
        }

        this.detailBookingByBookingId.roomInformation = res.room_information.map(y => {
          const data = {
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
            
          };
          return data;
        });
        console.log('[detailBooking by Booking id]', this.detailBookingByBookingId);
      })
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
