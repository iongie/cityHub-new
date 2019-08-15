import { PaymentTypeService } from './../../../../services/payment-type/payment-type.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
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
import { takeUntil, map, filter } from 'rxjs/operators';
import { NbDialogService, NbMenuService } from '@nebular/theme';

@Component({
  selector: 'ngx-charge',
  templateUrl: './charge.component.html',
  styleUrls: ['./charge.component.scss']
})
export class ChargeComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  dialog: TemplateRef<any>;
  items = [
    { 
      title: 'Payment',
    },
    { 
      title: 'Deposit',
    },
    { 
      title: 'Extra Charge',
    },
  ];
  charge = {
    discount: '',
    totalCharge: '',
    totalRate: '',
    totalTax: '',
  };
  chargeDetail: LocalDataSource;
  roomListBooking = {
    bookingRoomId: '',
    bookingRoomStatuId: '',
    bookingId: '',
    roomTypeId: '',
    roomTypeName: '',
    roomId: '',
    baseAdult: '',
    baseChild: '',
    maxAdult: '',
    maxChild: '',
  };
  bookingDetail = {
    arrivalDate: new Date(),
    departureDate: new Date(),
    duration: 0,
    bookingStatusName: '',
    businessSourceName: '',
    guestName: '',
    address: '',
    guestFileScan: '',
    countryName: '',
    email: '',
    phoneNumber: '',
  };
  addingPayment = {
    bookingId: '',
    paymentTypeId: '',
    totalPaid: '',
    paymentNote: '',
    createdBy: '',
    paymentRemark: 'charge',
  };
  bookingId: any;
  bookingNumber: any;
  bookingRoomType: any;
  paymentType: any;
  userCityHub: any;
  forRole: any;
  show: any;
  showOption= {
    tabs: false,
    payment: {
      active: false,
      disabled: false,
    },
    deposit: {
      active: false,
      disabled: false,
    },
    extraPayment: {
      active: false,
      disabled: false,
    },
  };
  settingsChargeDetail = {
    actions: {
      add: false,
      edit: true,
      delete: false,
    },
    pager:{
      display: false,
      perPage: 20,
    },
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      chargeCreatedAt: {
        title: 'Category',
        type: 'string',
        editable: false,
      },
      chargeCategory: {
        title: 'Charge category',
        type: 'string',
        editable: false,
      },
      chargeTax: {
        title: 'Charge tax',
        type: 'string',
      },
      chargeTotal: {
        title: 'Charge total',
        type: 'string',
      },
    },
  };

  settingsRoomListDetail = {
    actions: false,
    columns: {
      roomTypeName: {
        title: 'Room type name',
        type: 'string',
        editable: false,
      },
      baseAdult: {
        title: 'base adult',
        type: 'string',
        editable: false,
      },
      baseChild: {
        title: 'base child',
        type: 'string',
      },
      maxAdult: {
        title: 'max adult',
        type: 'string',
      },
      maxChild: {
        title: 'max child',
        type: 'string',
      },
    },
  };

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
    private dialogService: NbDialogService,
    public paymentTypeServ: PaymentTypeService,
    private nbMenuService: NbMenuService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.detailAccount();
    this.getPaymentType();
    this.refreshCharge();
    this.action();
    this.showOption;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'booking-charge'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.title === 'Payment') {
        this.showOption.tabs = true; 

        this.showOption.payment.active = true;
        this.showOption.payment.disabled = false;
        
        this.showOption.deposit.active = false;
        this.showOption.deposit.disabled = true;

        this.showOption.extraPayment.active = false;
        this.showOption.extraPayment.disabled = true;
      }

      if (item.title === 'Deposit') {
        this.showOption.tabs = true; 

        this.showOption.payment.active = false;
        this.showOption.payment.disabled = true;
        
        this.showOption.deposit.active = true;
        this.showOption.deposit.disabled = false;

        this.showOption.extraPayment.active = false;
        this.showOption.extraPayment.disabled = true;
      }

      if (item.title === 'Extra Charge') {
        this.showOption.tabs = true; 

        this.showOption.payment.active = false;
        this.showOption.payment.disabled = true;
        
        this.showOption.deposit.active = false;
        this.showOption.deposit.disabled = true;

        this.showOption.extraPayment.active = true;
        this.showOption.extraPayment.disabled = false;
      }
      
    });
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

        const chargeDetailBooking = resChargeBooking.charge_detail;

        const chargeDetail = chargeDetailBooking.map((y) => {
          const yuio = {
            baseAdult: y.base_adult,
            baseChild: y.base_child,
            baseRate: y.base_rate,
            bookingId: y.booking_id,
            chargeCategory: y.charge_category,
            chargeCreatedAt: this.datepipe.transform(y.charge_created_at, 'MMMM d, y'),
            chargeCreatedBy: y.charge_created_by,
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
        this.chargeDetail = new LocalDataSource (chargeDetail);
        this.addingPayment.totalPaid = chargeDetail[0].chargeTotal;
        console.log('resChargeBooking', resChargeBooking);
        console.log('charge', this.charge);
        console.log('chargeDetail', chargeDetail);
      })

      this.bookingServ.getById(bookingId).pipe(takeUntil(this.subs)).subscribe(resBooking => {
        this.bookingNumber = resBooking.booking.booking_number;

        this.bookingDetail = {
          arrivalDate:  new Date(resBooking.booking.arrival_date),
          departureDate:  new Date(resBooking.booking.departure_date),
          duration: resBooking.booking.duration,
          bookingStatusName: resBooking.booking.booking_status_name,
          businessSourceName: resBooking.booking.business_source_name,
          guestName: resBooking.booking.guest_name,
          address: resBooking.booking.address,
          guestFileScan: resBooking.booking.guest_file_scan,
          countryName: resBooking.booking.country_name,
          email: resBooking.booking.email,
          phoneNumber: resBooking.booking.phone_number,
        };

        this.roomListBooking = resBooking.room_list.map((y) => {
          const data = {
            bookingRoomId: y.booking_room_id,
            bookingRoomStatuId: y.booking_room_status_id,
            bookingId: y.booking_id,
            roomTypeId: y.room_type_id,
            roomTypeName: y.room_type_name,
            roomId: y.room_id,
            baseAdult: y.base_adult,
            baseChild: y.base_child,
            maxAdult: y.max_adult,
            maxChild: y.max_child,
          };
          return data;
        });

        // this.roomListBooking = roomListBooking;
        console.log('[roomListBooking]' ,this.roomListBooking);
        console.log(this.bookingDetail);
      });
    });
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].username,
      };
      console.log('userCityHub', this.userCityHub);
    });
  }

  refreshCharge() {
    this.bookingServ.refresh.subscribe(() => {
      this.viewById();
    });
  }
  

  openPayment(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, { context: 'this is some additional data passed to dialog' });
  }

  getPaymentType() {
    const menu = {
      name: 'all',
    }
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
      })
    })
  }

  roomTypeChange(event){
    console.log('[room type change]',event);
    
  }

  addPayment() {
    this.showOption.tabs = false;
    // this.activeRoute.params.subscribe(params => {
    //   const data = {
    //     bookingId: params.id,
    //     paymentTypeId: this.addingPayment.paymentTypeId,
    //     totalPaid: this.addingPayment.totalPaid,
    //     paymentNote: this.addingPayment.paymentNote,
    //     createdBy: this.userCityHub.name,
    //     paymentRemark: this.addingPayment.paymentRemark,
    //   }
    //   this.bookingServ.addPayment(data).pipe(takeUntil(this.subs)).subscribe(resAddPayment => {
    //     console.log('[add-payment]', resAddPayment);
    //     const title = 'Add Payment';
    //     const content = 'Data has been save';
    //     this.notifServ.showSuccessTypeToast(title, content);
    //   });
    // });
  }

  addDeposit() {

  }

}
