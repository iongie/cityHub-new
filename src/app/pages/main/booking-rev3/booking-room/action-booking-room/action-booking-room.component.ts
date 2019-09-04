import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { BookingRoomComponent } from '../booking-room.component';
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
import { Subject } from 'rxjs';
import { DetailBookingByBookingRoomId, AddPayment, AddExtraPayment, ExtraCharge } from '../../booking';
import { NbDialogService } from '@nebular/theme';
import { PaymentTypeService } from '../../../../../services/payment-type/payment-type.service';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';

@Component({
  selector: 'ngx-action-booking-room',
  templateUrl: './action-booking-room.component.html',
  styleUrls: ['./action-booking-room.component.scss'],
})
export class ActionBookingRoomComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  detailBookingByBookingRoomId = new DetailBookingByBookingRoomId;
  show: any;
  forRole: any;
  roomTypeId = 0;
  dataAddPaymentDeposit = new AddPayment;
  dataAddExtraPaymentDeposit = new AddExtraPayment;
  extraCharge: any;
  paymentType: any;
  checkedCheckIn = false;
  checkedCheckOut = false;
  actionCheckOut = {
    lateCheckOutRate: '',
  };
  dataAddPaymentCharge = new AddPayment;
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
    private dialogService: NbDialogService,
    public paymentTypeServ: PaymentTypeService,
    public notifServ: NotificationService,
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
  ) { }

  ngOnInit() {
    this.getBookingInfomationByBookingRoomId();
    this.getPaymentType();
    this.detailAccount();
    this.refresh();
    this.dataAddPaymentDeposit.totalPaid = 200000;
    this.getExtraCharge();
    this.checkedCheckIn;
    this.checkedCheckOut;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getExtraCharge() {
    this.extraChargeServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraCharge => {
      this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraChargeCategory => {
        const data = resExtraCharge.map((y) => {
          const abc = resExtraChargeCategory.filter((z) => {
            return z.extra_charge_category_id === y.extra_charge_category_id;
          });
          const xyz = {
            createAt: y.created_at,
            createBy: y.created_by,
            extraChargeCategoryId: y.extra_charge_category_id,
            extraChargeCategoryName: abc[0].extra_charge_category_name,
            extraChargeId: y.extra_charge_id,
            extraChargeName: y.extra_charge_name,
            extraChargeRate: y.extra_charge_rate,
            extraChargeStatus: y.extra_charge_status,
            uploadAt: y.updated_at,
            uploadBy: y.updated_by,
          };
          return xyz;
        });
        this.extraCharge = data;
      });
    }, err => {

    });
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

  refresh() {
    this.bookingServ.refresh.subscribe(() => {
      this.getBookingInfomationByBookingRoomId();
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

  openAddDeposit(dialogDeposit: TemplateRef<any>) {
    this.dialogService.open(dialogDeposit);
  }
  openAddRoom(dialogRoom: TemplateRef<any>) {
    this.dialogService.open(dialogRoom);
  }

  openActionCheckIn(dialogCheckIn: TemplateRef<any>) {
    this.dialogService.open(dialogCheckIn);
  }

  openActionCheckOut(dialogCheckOut: TemplateRef<any>) {
    this.dialogService.open(dialogCheckOut);
  }

  openActionNoShow(dialogOpenShow: TemplateRef<any>) {
    this.dialogService.open(dialogOpenShow);
  }

  openActionCancel(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel);
  }

  openDialogExtraCHarge(dialogExtraCharge: TemplateRef<any>) {
    this.dialogService.open(dialogExtraCharge);
  }

  toggleCheckin(event) {
    this.checkedCheckIn = event.target.checked;
    console.log('checkedCheckIn', event.target.checked);
  }

  toogleCheckOut(checkedCheckOut: boolean) {
    this.checkedCheckOut = checkedCheckOut;
    console.log('checkedCheckOut', checkedCheckOut);
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

  addPaymentExtraCharge() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        paymentTypeId: this.dataAddExtraPaymentDeposit.paymentTypeId,
        extraChargeId: this.dataAddExtraPaymentDeposit.extraChargeId,
        extraPaymentNote: this.dataAddExtraPaymentDeposit.extraPaymentNote,
        createdBy: this.userCityHub.name,
      };

      this.bookingServ.extraCharge(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resPayment => {
        const title = 'Add Extra Charge Payment';
        const content = 'Add Extra Charge Payment successfully';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'Error - Add Extra Charge Payment';
        const content = 'Add Extra Charge payment not saved';
        this.notifServ.showDangerTypeToast(title, content);
      });
    });
  }

  addPaymentDeposit() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        paymentTypeId: this.dataAddPaymentDeposit.paymentTypeId,
        totalPaid: this.dataAddPaymentDeposit.totalPaid,
        paymentNote: this.dataAddPaymentDeposit.paymentNote,
        createdBy: this.userCityHub.name,
        paymentRemark: 'add_deposit',
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

  cancelCheckIn () {
    this.checkedCheckIn = false;
  }

  checkIn() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        checkinBy: this.userCityHub.name,
        earlyCheckIn: this.checkedCheckIn,
      };
      this.bookingServ.checkIn(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resCheckIn => {
        const title = 'Check In for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check In successfully';
        this.notifServ.showSuccessTypeToast(title, content);
        this.checkedCheckIn = false;
      }, err => {
        const title = 'Check In for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check In Error';
        this.notifServ.showDangerTypeToast(title, content);
        this.checkedCheckIn = false;
      });
    });
  }

  cancelCheckOut () {
    this.checkedCheckOut = false;
  }

  checkOut() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        checkinBy: this.userCityHub.name,
        lateCheckOut: this.checkedCheckOut,
        lateCheckOutRate: this.actionCheckOut.lateCheckOutRate,
      };
      this.bookingServ.checkOut(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resCheckIn => {
        const title = 'Check Out for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check Out successfully';
        this.notifServ.showSuccessTypeToast(title, content);
        this.checkedCheckIn = false;
      }, err => {
        const title = 'Check Out for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check Out Error';
        this.notifServ.showDangerTypeToast(title, content);
        this.checkedCheckIn = false;
      });
    });
  }

  noShow() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        bookingRoomId: params.id,
        noShowBy: this.userCityHub.name,
      };
      this.bookingServ.noShow(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resCheckIn => {
        const title = 'Cancel for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Cancel successfully';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'Cancel for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Cancel Error';
        this.notifServ.showDangerTypeToast(title, content);
      });
    });
  }

  cancelBookingRoom() {
    this.activeRoute.params.subscribe(params => {
      const bookingRooom = {
        id: params.id,
      };
      const data = {
        bookingRoomId: params.id,
        cancelBy: this.userCityHub.name,
      };
      this.bookingServ.noShow(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resCheckIn => {
        const title = 'No show for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'No show successfully';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'No show for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'No show Error';
        this.notifServ.showDangerTypeToast(title, content);
      });
    });
  }
}
