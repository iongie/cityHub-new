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
import { LocalDataSource } from 'ng2-smart-table';
import { DetailBookingByBookingRoomId } from '../booking';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.scss'],
})
export class BookingRoomComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  charge: LocalDataSource;
  detailBookingByBookingRoomId = new DetailBookingByBookingRoomId;
  show: any;
  forRole: any;
  roomTypeId = 0;
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
            this.roomTypeId = resGetBookingInformation.room_information.room_type_id;
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

            this.detailBookingByBookingRoomId.chargeTotal = {
              discountTotal: resGetBookingInformation.charge_total.discount_total,
              rateTotal: resGetBookingInformation.charge_total.rate_total,
              taxTotal: resGetBookingInformation.charge_total.tax_total,
              total: resGetBookingInformation.charge_total.total,
            };

            this.detailBookingByBookingRoomId.charge = resGetBookingInformation
            .charge.map(x => {
              const y = {
                chargeId: x.charge_id,
                taxId: x.tax_id,
                seasonId: x.season_id,
                bookingRoomId: x.bookinf_room_id,
                roomReservationId: x.room_reservation_id,
                paymentForDate: x.payment_for_date,
                discount: x.discount,
                chargeRate: x.charge_rate,
                chargeTax: x.charge_tax,
                chargeTotal: x.charge_total,
                chargeNote: x.charge_note,
                chargeStatus: x.charge_status,
                chargeCategory: x.charge_category,
                chargeCreatedAt: x.charge_created_at,
                chargeCreatedBy: x.charge_created_by,
                chargeUpdatedAt: x.charge_updated_at,
                chargeUpdatedBy: x.charge_updated_by,
                taxName: x.tax_name,
                taxRate: x.tax_rate,
                taxStatus: x.tax_status,
                createdAt: x.created_at,
                createdBy: x.created_by,
                updatedBy: x.updated_by,
                seasonTypeId: x.season_type_id,
                seasonName: x.season_name,
                fromDate: x.from_date,
                toDate: x.to_date,
                startDate: x.start_date,
                endDate: x.end_date,
                seasonStatus: x.season_status,
                seasonDescription: x.season_description,
                roomTypeId: x.room_type_id,
                reservedDate: x.reserved_date,
                reservationStatus: x.reservation_status,
                reservationCreatedAt: x.reservation_created_at,
                reservationUpdatedAt: x.reservation_updated_at,
                seasonTypeName: x.season_type_name,
                seasonTypeDescription: x.season_type_description,
              };
              return y;
            });

            this.detailBookingByBookingRoomId.payment = resGetBookingInformation
            .payment.map(x => {
              const y = {
                paymentId: x.payment_id,
                bookingRoomId: x.booking_room_id,
                paymentTypeId: x.payment_type_id,
                paymentNumber: x.payment_number,
                billingNumber: x.billing_number,
                paymentDate: new Date(x.payment_date),
                rateTotal: x.rate_total,
                taxTotal: x.tax_total,
                paidTotal: x.paid_total,
                paymentNote: x.payment_note,
                paymentRemark: x.payment_remark,
                paymentStatus: x.payment_status,
                paymentCategory: x.payment_category,
                paymentCreatedAt: new Date(x.payment_created_at),
                paymentUpdatedAt: new Date(x.payment_update_at),
                paymentCreatedBy: x.payment_created_by,
                paymentUpdatedBy: x.payment_updated_by,
                paymentTypeName: x.payment_type_name,
                paymentTypeDbStatus: x.payment_type_db_status,
                detail: {
                  id:  x.payment_id,
                },
              };
              return y;
            });

            console.log('this.detailBookingByBookingRoomId', this.detailBookingByBookingRoomId);
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
