import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
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
import { DetailBookingByBookingRoomId, AddPayment, AddExtraPayment, AssignRoom, Room} from '../booking';
import { takeUntil } from 'rxjs/operators';
import { ExtraChargeService } from '../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../services/extra-charge-category/extra-charge-category.service';
import { PaymentTypeService } from '../../../../services/payment-type/payment-type.service';
import { NbDialogService } from '@nebular/theme';
import { LinkDetailPaymentInformationComponent } from './link-detail-payment-information/link-detail-payment-information.component';

@Component({
  selector: 'ngx-booking-room',
  templateUrl: './booking-room.component.html',
  styleUrls: ['./booking-room.component.scss'],
})
export class BookingRoomComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  detailBookingByBookingRoomId = new DetailBookingByBookingRoomId;
  show: any;
  forRole: any;
  roomTypeId = 0;

   // TODO: setting for smart table payment information
   paymentInformation: LocalDataSource;
   settingPayment = {
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
        renderComponent: LinkDetailPaymentInformationComponent,
        filter: false,
      },
    },
  };

   // TODO: setting for smart table charge information
  chargeInformation: LocalDataSource;
  settingCharge = {
    actions: false,
    columns: {
      paymentForDate: {
        title: 'Payment for date',
        type: 'string',
      },
      chargeNote: {
        title: 'Charge note',
        type: 'string',
      },
      chargeCategory: {
        title: 'Charge category',
        type: 'string',
      },
      chargeRate: {
        title: 'Charge rate',
        type: 'string',
      },
      chargeTax: {
        title: 'Charge tax',
        type: 'string',
      },
      discount: {
        title: 'Discount',
        type: 'string',
      },
      chargeTotal: {
        title: 'Charge total',
        type: 'string',
      },
      seasonTypeName: {
        title: 'Season type',
        type: 'string',
      },
      seasonName: {
        title: 'Season',
        type: 'string',
      },
    },
  };

  // TODO: setting for smart table extra charge
  extraChargeInformation: LocalDataSource;
  settingExtraCharge = {
    actions: false,
    columns: {
      extraPaymentNumber: {
        title: 'Extra Payment Number',
        type: 'string',
      },
      extraChargeCategoryName: {
        title: 'Extra Charge Category',
        type: 'string',
      },
      extraChargeName: {
        title: 'Extra Charge Name',
        type: 'string',
      },
      extraPaymentAmount: {
        title: 'Amount',
        type: 'string',
      },
    },
  };

  // TODO: setting Action
  dataAddPaymentDeposit = new AddPayment;
  dataAddPaymentCharge = new AddPayment;
  dataAddExtraPaymentDeposit = new AddExtraPayment;
  extraCharge: any;
  paymentType: any;
  checkedCheckIn = false;
  checkedCheckOut = false;
  actionCheckOut = {
    lateCheckOutRate: 0,
  };

  // TODO : variable for GET ChargeTotal
  charge = {
    total: 0,
  };
  // TODO : variable for Add Room
  assignRoom = new AssignRoom;
  room = new Room;
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
    this.getExtraCharge();
    this.getPaymentType();
    this.getBookingInfomationByBookingRoomId();
    this.dataAddPaymentDeposit.totalPaid = 200000;
    this.detailAccount();
    this.getTotalCharge();
    this.refresh();
    this.refreshTotalCharge();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  // TODO: GET total charge
  getTotalCharge() {
    this.activeRoute.params.subscribe(params => {
      const bookingRoom = {
        id: params.id,
      };

      this.bookingServ.getChargeTotal(bookingRoom)
      .pipe(takeUntil(this.subs))
      .subscribe(resChargeTotal => {
        this.charge.total = resChargeTotal.charge_total;
        console.log('this.charge.total ', this.charge.total );
        this.dataAddPaymentCharge.totalPaid = this.charge.total;
      });
    });
  }

  refreshTotalCharge() {
    this.bookingServ.refresh.subscribe(() => {
      this.getTotalCharge(); // ! refresh get Total charge
    });
  }

  // TODO: GET extra charge
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

  // TODO: GET payment type
  getPaymentType() {
    const menu = {
      name: 'all',
    };
    this.paymentTypeServ.get(menu).pipe(takeUntil(this.subs)).subscribe(resPaymentType => {
      const paymentType = resPaymentType.filter((y) => {
        return y.payment_type_db_status === 'active'; // ! filter payment type
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

  // TODO: GET information by booking room id
  getBookingInfomationByBookingRoomId() {
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
            this.roomTypeId = resGetBookingInformation.room_information.room_type_id;

            this.detailBookingByBookingRoomId.roomInformation = { // ! data room information
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

            this.detailBookingByBookingRoomId.chargeTotal = { // ! data charge total
              discountTotal: resGetBookingInformation.charge_total.discount_total,
              rateTotal: resGetBookingInformation.charge_total.rate_total,
              taxTotal: resGetBookingInformation.charge_total.tax_total,
              total: resGetBookingInformation.charge_total.total,
            };

            const charge = resGetBookingInformation // ! data charge
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

            const payment = resGetBookingInformation // ! data payment
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

            const extraCharge = resGetBookingInformation // ! data extra charge
            .extra_charge.map(x => {
              const xyz = {
                bookingRoomId: x.booking_room_id,
                createdAt: x.created_at,
                createdBy: x.created_by,
                updatedAt: x.updated_at,
                updatedBy: x.update_by,
                extraChargeCategoryId: x.extra_charge_category_id,
                extraChargeCategoryName: x.extra_charge_category_name,
                extraChargeDescription: x.extra_charge_description,
                extraChargeId: x.extra_charge_id,
                extraChargeName: x.extra_charge_name,
                extraChargeRate: x.extra_charge_rate,
                extraChargeStatus: x.extra_charge_status,
                extraPaymentAmount: x.extra_payment_amount,
                extraPaymentCreatedAt: x.extra_payment_created_at,
                extraPaymentCreatedBy: x.extra_payment_created_by,
                extraPaymentDate: x.extra_payment_date,
                extraPaymentId: x.extra_payment_id,
                extraPaymentNote: x.extra_payment_note,
                extraPaymentNumber: x.extra_payment_number,
                extraPaymentStatus: x.extra_payment_status,
                extraPaymentUpdatedAt: x.extra_payment_updated_at,
                extraPaymentUpdatedBy: x.extra_payment_updated_by,
                paymentTypeDbStatus: x.payment_type_db_status,
                paymentTypeId: x.payment_type_id,
                paymentTypeName: x.payment_type_name,
              };
              return xyz;
            });
            this.paymentInformation = new LocalDataSource(payment);
            this.chargeInformation = new LocalDataSource(charge);
            this.extraChargeInformation = new LocalDataSource(extraCharge);

            console.log('this.detailBookingByBookingRoomId', payment);

            // TODO: GET Data room type
            if (this.detailBookingByBookingRoomId.roomInformation.roomId === null) {
              this.detailBookingByBookingRoomId.room = {
                floorName: '',
                roomName: '',
              };
            }else {
              this.detailBookingByBookingRoomId.room = {
                floorName: resGetBookingInformation.room_information.floor_name,
                roomName: resGetBookingInformation.room_information.room_name,
              };
            }

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

  refresh() {
    this.bookingServ.refresh.subscribe(() => {
      this.getBookingInfomationByBookingRoomId(); // ! refresh get booking by booking room
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
      console.log(this.userCityHub);
    });
  }

  // TODO: funtion Dialog
  openAddPayment(dialogPayment: TemplateRef<any>) {
    this.dialogService.open(dialogPayment); // ! dialog add payment
  }

  openAddDeposit(dialogDeposit: TemplateRef<any>) {
    this.dialogService.open(dialogDeposit); // ! dialog add deposit
  }
  openAddRoom(dialogAddRoom: TemplateRef<any>) {
    this.dialogService.open(dialogAddRoom); // ! dialog add aoom
  }

  openActionCheckIn(dialogCheckIn: TemplateRef<any>) {
    this.dialogService.open(dialogCheckIn); // ! dialog check in process
  }

  openActionCheckOut(dialogCheckOut: TemplateRef<any>) {
    this.dialogService.open(dialogCheckOut); // ! dialog check out process
  }

  openActionNoShow(dialogOpenShow: TemplateRef<any>) {
    this.dialogService.open(dialogOpenShow); // ! dialog no show process
  }

  openActionCancel(dialogCancel: TemplateRef<any>) {
    this.dialogService.open(dialogCancel); // ! dialog cancel process
  }

  openDialogExtraCHarge(dialogExtraCharge: TemplateRef<any>) {
    this.dialogService.open(dialogExtraCharge); // ! dialog add extra charge process
  }

  // TODO: Send Condition TRUE, FALSE for early check in and check out
  toggleCheckin(event) {
    this.checkedCheckIn = event.target.checked; // ! check in
    console.log('checkedCheckIn', event.target.checked);
  }

  toogleCheckOut(checkedCheckOut: boolean) {
    this.checkedCheckOut = checkedCheckOut; // ! check out
    console.log('checkedCheckOut', checkedCheckOut);
  }

  // TODO : Function Add Room
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

  // TODO : Function Add Payment of Charge
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
        this.charge.total;
      }, err => {
        const title = 'Error - Add Payment';
        const content = 'Add payment not saved';
        this.notifServ.showDangerTypeToast(title, content);
      });
    });
  }

  // TODO : Function Add Payment of Extra Charge
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

  // TODO : Function Add Payment of Deposit
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

  // TODO : Process Check In
  cancelCheckIn () {
    this.checkedCheckIn = false; // ! Cancel Check in ---> reset value TRUE to FALSE
  }

  checkIn() {
    this.activeRoute.params.subscribe(params => { // ! Aprrove Check in
      const data = {
        bookingRoomId: params.id,
        checkinBy: this.userCityHub.name,
        earlyCheckIn: this.checkedCheckIn,
      };
      this.bookingServ.checkIn(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resCheckIn => { // ! Success Check In
        console.log('resCheckIn', resCheckIn);
        if (!resCheckIn.Error) {
          const title = 'Check In for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
          const content = 'Check In successfully';
          this.notifServ.showSuccessTypeToast(title, content);
          this.checkedCheckIn = false;
        } else {
          const title = 'No assign room for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
          const content = resCheckIn.Error;
          this.notifServ.showWarningTypeToast(title, content);
          this.checkedCheckIn = false;
        }
      }, err => { // ! Not Success Check In
        const title = 'Check In for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check In Error';
        this.notifServ.showDangerTypeToast(title, content);
        this.checkedCheckIn = false;
      });
    });
  }

   // TODO : Process Check Out
  cancelCheckOut () {
    this.checkedCheckOut = false; // ! Cancel Check out ---> reset value TRUE to FALSE
  }

  checkOut() {
    this.activeRoute.params.subscribe(params => { // ! Aprrove Check Out
      const data = {
        bookingRoomId: params.id,
        checkoutBy: this.userCityHub.name,
        lateCheckOut: this.checkedCheckOut,
        lateCheckOutRate: this.actionCheckOut.lateCheckOutRate,
      };
      this.bookingServ.checkOut(data)
      .pipe(takeUntil(this.subs))
      .subscribe(resCheckOut => { // ! Success Check Out
        console.log('resCheckIn', resCheckOut);
        const title = 'Check Out for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check Out successfully';
        this.notifServ.showSuccessTypeToast(title, content);
        this.checkedCheckIn = false;

        // TODO: include action return deposit
        const dataReturnDeposit = {
          bookingRoomId: params.id,
          paymentTypeId: this.dataAddPaymentDeposit.paymentTypeId,
          totalPaid: this.dataAddPaymentDeposit.totalPaid,
          paymentNote: this.dataAddPaymentDeposit.paymentNote,
          createdBy: this.userCityHub.name,
          paymentRemark: 'return_deposit',
        };

      this.bookingServ.deposit(dataReturnDeposit)
        .pipe(takeUntil(this.subs))
        .subscribe(() => {});
      }, err => { // ! Not Success Check Out
        const title = 'Check Out for Booking room' + this.detailBookingByBookingRoomId.roomInformation.bookingRoomId;
        const content = 'Check Out Error';
        this.notifServ.showDangerTypeToast(title, content);
        this.checkedCheckIn = false;
      });
    });
  }

  // TODO : Process No Show
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

  // TODO : Process Cancel Booking based on Booking room
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

  // TODO : Go To Page Add Stay
  goToAddStay() {
    this.activeRoute.params.subscribe(params => {
      const bookingRooom = {
        id: params.id,
        number: params.number,
      };

      this.router.navigate([
        '/pages/booking-detail/add-stay/' +
        params.number + '/' +
        params.id,
      ]);
    });
  }

  // TODO : Go To Page Less Stay
  goToLessStay() {
    this.activeRoute.params.subscribe(params => {
      const bookingRooom = {
        id: params.id,
        number: params.number,
      };

      this.router.navigate([
        '/pages/booking-detail/less-stay/' +
        params.number + '/' +
        params.id,
      ]);
    });
  }

  // TODO : Go To Page Move Room
  goToMoveRoom() {
    this.activeRoute.params.subscribe(params => {
      const bookingRooom = {
        id: params.id,
        number: params.number,
      };

      this.router.navigate([
        '/pages/booking-detail/move-room/' +
        params.number + '/' +
        params.id,
      ]);
    });
  }

  // TODO : Go To Extend Room
  goToExtendRoom() {
    this.activeRoute.params.subscribe(params => {
      const bookingRooom = {
        id: params.id,
        number: params.number,
      };

      this.router.navigate([
        '/pages/booking-detail/extend-room/' +
        this.detailBookingByBookingRoomId.roomInformation.bookingId,
      ]);
    });
  }

  // TODO : GO View Nota
  goToNota() {
    this.activeRoute.params.subscribe(params => {
      const bookingRoom = {
        id: params.id,
        number: params.number,
      };

      this.router.navigate(['/pages/booking-detail/nota/' + bookingRoom.number + '/' + bookingRoom.id]);
    });
  }
}
