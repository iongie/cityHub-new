import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../../services/auth/auth.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { BookingService } from '../../../../services/booking/booking.service';
import { BusinessSourceService } from '../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../services/guest/guest.service';
import { RoomTypeService } from '../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../services/room-operation/room-operation.service';
import { CountryService } from '../../../../services/country/country.service';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  charge = {
    discount: '',
    totalCharge: '',
    totalRate: '',
    totalTax: '',
  };
  chargeDetail: any;
  userCityHub: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public bookingServ: BookingService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public notificationServ: NotificationService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public countryServ: CountryService,
    public datepipe: DatePipe,
  ) { }

  ngOnInit() {
    this.viewById();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }
  viewById() {
    this.activeRoute.params.subscribe(params => {
      const bookingId = {
        id: params.id,
      };
      this.bookingServ.getChargeById(bookingId).pipe(takeUntil(this.subs)).subscribe(resChargeBooking => {
        this.charge = {
          discount: resChargeBooking.charge.discount,
          totalCharge: resChargeBooking.charge.total_charge,
          totalRate: resChargeBooking.charge.total_rate,
          totalTax: resChargeBooking.charge.total_tax,
        };

        const chargeDetail = resChargeBooking.charge_detail;

        this.chargeDetail = chargeDetail.map((y) => {
          const yuio = {
            baseAdult: y.base_adult,
            baseChild: y.base_child,
            baseRate: y.base_rate,
            bookingId: y.booking_id,
            chargeCategory: y.charge_category,
            chargeCreatedAt: y.charge_created_at,
            chargeCreatedBy: y.charge_created_by,
            chargeId: y.charge_id,
            chargeNote: y.charge_note,
            chargeRate: y.charge_rate,
            chargeStatus: y.charge_status,
            chargeTax: y.charge_tax,
            chargeTotal: y.charge_total,
            chargeUpdatedAt: y.charge_updated_at,
            chargeUpdatedBy: y.charge_updated_by,
            creatdAt: y.created_at,
            createdBy: y.created_by,
            discount: y.discount,
            endDate: y.end_date,
            fromDate: y.from_date,
            increaseRate: y.increase_rate,
            maxAdult: y.max_adult,
            maxChild: y.max_child,
            paymentForDate: y.payment_for_date,
            reservationCreatedAt: y.reservation_created_at,
            reservationStatus: y.reservation_status,
            reservationUpdatedAt: y.reservation_updated_at,
            reservedDate: y.reserved_date,
            roomDescription: y.room_description,
            roomReservationId: y.room_reservation_id,
            roomTypeId: y.room_type_id,
            roomTypeName: y.room_type_name,
            seasonDescription: y.season_description,
            seasonId: y.season_id,
            seasonName: y.season_name,
            seasonStatus: y.season_status,
            seasonTypeId: y.season_type_id,
            startDate: y.start_date,
            taxId: y.tax_id,
            taxName: y.tax_name,
            taxRate: y.tax_rate,
            taxStatus: y.tax_status,
            toDate: y.to_date,
            totalRoom: y.total_room,
            updatedAt: y.updated_at,
            updatedBy: y.updated_by,
          };
          return yuio;
        });
        console.log('resChargeBooking', resChargeBooking);
        console.log('charge', this.charge);
        console.log('chargeDetail', this.chargeDetail);
      })
    });
  }

}
