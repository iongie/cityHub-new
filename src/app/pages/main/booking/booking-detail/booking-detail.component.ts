import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, interval, Observable } from 'rxjs';
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
import { PaymentTypeService } from '../../../../services/payment-type/payment-type.service';
import { NbMenuService } from '@nebular/theme';
import { takeUntil, map, first, mergeMap, filter } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';
import { FloorService } from '../../../../services/floor/floor.service';
import { RoomStatusService } from '../../../../services/room-status/room-status.service';

@Component({
  selector: 'ngx-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit, OnDestroy {
  tes$: Observable<any>;
  private subs: Subject<void> = new Subject();
  show = {
    role : false,
    button: {
      roomList: false,
      room: false,
      assignRoom: false,
      checkIn: false,
      checkOut: false,
    },
    select: {
      roomTypeId: false,
    },
    tab : {
      generalInformation: true,
      roomList: true,
      roomInformation: false,
      deposit: false,
      charge: false,
      extraCharge: false,
      payment: false,
      extraPayment: false,
    },
    tabActive: {
      generalInformation: true,
      roomList: true,
      roomInformation: false,
      deposit: false,
      charge: false,
      extraCharge: false,
      payment: false,
      extraPayment: false,
    },
    notFound: {
      deposit: true,
      charge: true,
      extraCharge: true,
      payment: true,
      extraPayment: true,
    },
    add: {
      deposit: false,
      charge: false,
      extraCharge: false,
      payment: false,
      extraPayment: false,
    },
    edit: {
      deposit: false,
      charge: false,
      extraCharge: false,
      payment: false,
      extraPayment: false,
    },
    view: {
      deposit: false,
      charge: false,
      extraCharge: false,
      payment: false,
      extraPayment: false,
      assignRoom: false,
    }
  };
  forRole: any;
  bookingNumber: any;
  bookingData = {
    bookingId: '',
    guestId: '',
    bookingStatusId: '',
    businessSourceId: '',
    bookingNumber: '',
    arrivalDate: new Date(),
    duration: 0,
    departureDate: new Date(),
    totalRoom: '',
    bookingCreatedAt: '',
    bookingCreatedBy: '',
    bookingUpdatedAt: '',
    bookingupdatedBy: '',
    checkinAt: '',
    checkinBy: '',
    checkoutAt: '',
    checkoutBy: '',
    cancelAt: '',
    cancelBy: '',
    cancelReason: '',
    countryId: '',
    guestName: '',
    address: '',
    city: '',
    email: '',
    phoneNumber: '',
    guestFileScan: '',
    guestCreatedAt: '',
    guestUpdateAt: '',
    businessSourceName: '',
    businessSourceDescription: '',
    businessSourceCreatedAt: '',
    businessSourceUpdateAt: '',
    bookingStatusName: '',
    countryName: '',
  };
  roomListBooking: LocalDataSource;
  
  settingsRoomListBooking = {
    actions: false,
    selectMode: 'multi',
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
  selectedRowsRoomList = {
    bookingRoomId:'',
    bookingId: '',
    bookingRoomTypeId: '',
    roomId: '',
    bookingRoomStatusId: '',
    roomTypeName: '',
    baseAdult: '',
    baseChild: '',
    maxAdult: '',
    maxChild: '',
    baseRate: '',
    increaseRate: '',
    totalRoom: '',
    roomDescription: '',
    createdAt:'',
    updatedAt: '',
  };
  filterSelectedRowsRoomList = {
    bookingRoomId: '',
  };
  chargeTotal = {
    totalCharge: '',
    totalTax: '',
    totalRate: '',
    discount: '',
  };
  extraCharge: any;
  room = {
    bookingRoomId: '',
    bookingId: '',
    roomTypeId: '',
    roomId: '',
    bookingRoomStatusId: '',
    roomTypeName: '',
    baseAdult: '',
    baseChild: '',
    maxAdult: '',
    maxChild: '',
    baseRate: '',
    increaseRate: '',
    totalRoom: '',
    roomDescription: '',
    createdAt: '',
    updateAt: '',
    bookingRoomStatusName: '',
  };
  paymentList: any;
  chargeList = {
    bookingRoomId: '',
    chargeCategory: '',
    chargeCreatedAt: '',
    chargecreatedBy: '',
    chargeId: '',
    chargeNote: '',
    chargeRate: '',
    
  };
  addingPayment = {
    bookingId: '',
    paymentTypeId: '',
    totalPaid: '',
    paymentNote: '',
    createdBy: '',
    paymentRemark: 'charge',
  };
  addingDeposit = {
    bookingId: '',
    paymentTypeId: '',
    totalPaid: '',
    paymentNote: '',
    createdBy: '',
    paymentRemark: 'add_deposit',
  };
  returnDeposit = {
    bookingId: '',
    paymentTypeId: '',
    totalPaid: '',
    paymentNote: '',
    createdBy: '',
    paymentRemark: 'return_deposit',
  };
  paymentType: any;
  userCityHub: any;
  bookingRoomId: any;
  roomTypeId: any;
  assignRoom = {
    bookingRoomId: '',
    roomId: '',
  };
  earlyCheckin = false;
  lateCheckout = false;
  lateCheckoutRate = '';
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public bookingServ: BookingService,
    public businessSourceServ: BusinessSourceService,
    public guestServ: GuestService,
    public roomTypeServ: RoomTypeService,
    public roomOperationServ: RoomOperationService,
    public countryServ: CountryService,
    public datepipe: DatePipe,
    public paymentTypeServ: PaymentTypeService,
    private nbMenuService: NbMenuService,
    public floorServ: FloorService,
    public roomStatusServ: RoomStatusService,
  ) { }

  ngOnInit() {
    this.view();
    this.refreshView();
    this.getPaymentType();
    this.detailAccount();
    this.selectRoomList;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  view() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      // console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'booking_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show.role = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show.role = false;
        }if (filter[0].read_permision === 'allowed') {
          this.show.role = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show.role = false;
        }if (filter[0].update_permision === 'allowed') {
          this.show.role = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show.role = false;
        }if (filter[0].delete_permision === 'allowed') {
          this.show.role = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show.role = false;
        }

        this.activeRoute.params.subscribe(params => {
          const bookingId = {
            id: params.id,
          };

          this.bookingServ.getByBookingId(bookingId)
          .pipe(takeUntil(this.subs))
          .subscribe(resGetByBookingId => {
            this.bookingNumber = resGetByBookingId.booking_data.booking_number;
            const bookingData = {
              bookingId: resGetByBookingId.booking_data.booking_id,
              guestId: resGetByBookingId.booking_data.guest_id,
              bookingStatusId: resGetByBookingId.booking_data.booking_status_id,
              businessSourceId: resGetByBookingId.booking_data.business_source_id,
              bookingNumber: resGetByBookingId.booking_data.booking_number,
              arrivalDate: resGetByBookingId.booking_data.arrival_date,
              duration: resGetByBookingId.booking_data.duration,
              departureDate: resGetByBookingId.booking_data.departure_date,
              totalRoom: resGetByBookingId.booking_data.total_room,
              bookingCreatedAt: resGetByBookingId.booking_data.booking_created_at,
              bookingCreatedBy: resGetByBookingId.booking_data.booking_created_by,
              bookingUpdatedAt: resGetByBookingId.booking_data.booking_updated_at,
              bookingupdatedBy: resGetByBookingId.booking_data.booking_updated_by,
              checkinAt: resGetByBookingId.booking_data.checkin_at,
              checkinBy: resGetByBookingId.booking_data.checkin_by,
              checkoutAt: resGetByBookingId.booking_data.checkout_at,
              checkoutBy: resGetByBookingId.booking_data.checkout_by,
              cancelAt: resGetByBookingId.booking_data.cancel_at,
              cancelBy: resGetByBookingId.booking_data.cancel_by,
              cancelReason: resGetByBookingId.booking_data.cancel_reason,
              countryId: resGetByBookingId.booking_data.country_id,
              guestName: resGetByBookingId.booking_data.guest_name,
              address: resGetByBookingId.booking_data.address,
              city: resGetByBookingId.booking_data.city,
              email: resGetByBookingId.booking_data.email,
              phoneNumber: resGetByBookingId.booking_data.phone_number,
              guestFileScan: resGetByBookingId.booking_data.guest_file_scan,
              guestCreatedAt: resGetByBookingId.booking_data.guest_created_at,
              guestUpdateAt: resGetByBookingId.booking_data.guest_updated_at,
              businessSourceName: resGetByBookingId.booking_data.business_source_name,
              businessSourceDescription: resGetByBookingId.booking_data.business_source_description,
              businessSourceCreatedAt: resGetByBookingId.booking_data.business_source_created_at,
              businessSourceUpdateAt: resGetByBookingId.booking_data.business_source_updated_at,
              bookingStatusName: resGetByBookingId.booking_data.booking_status_name,
              countryName: resGetByBookingId.booking_data.country_name,
            };
            this.bookingData = bookingData;

            const roomListBooking = resGetByBookingId.room_list.map((y) => {
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
              }
              return data;
            });

            this.roomListBooking = new LocalDataSource (roomListBooking);
            console.log('[roomListBooking]', roomListBooking);
            console.log('[bookingData]', bookingData);
          });
        });
      });
      
    });
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

  getRoom(roomTypeId: any) {
    this.roomOperationServ.getByRoomTypeIdAndRoomStatus(roomTypeId)
    .pipe(takeUntil(this.subs))
    .subscribe(resGetRoom => {
      console.log('[resGetRoom]',resGetRoom);
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

  refreshView() {
    this.bookingServ.refresh.subscribe(() => {
      this.view();
    });
  }

  selectRoomListTab(event) {
    if( event.tabTitle === 'Room list') {
      this.show.button.roomList = true;
    } else {
      this.show.button.roomList = false;
    }
  }

  selectRoomList (event) {
    this.selectedRowsRoomList = event.selected.map((y) =>{
      const data = {
        bookingRoomId: y.bookingRoomId,
        bookingId: y.bookingId,
        bookingRoomTypeId: y.bookingRoomTypeId,
        roomId: y.roomId,
        bookingRoomStatusId: y.bookingRoomStatusId,
        roomTypeName: y.roomTypeName,
        baseAdult: y.baseAdult,
        baseChild: y.maxAdult,
        maxAdult: y.maxAdult,
        maxChild: y.maxChild,
        baseRate: y.baseRate,
        increaseRate: y.increaseRate,
        totalRoom: y.totalRoom,
        roomDescription: y.roomDescription,
        createdAt: y.createdAt,
        updatedAt: y.updatedAt,
      }
      return data;
    });
  }

  resGetByBookingRoomId(data: any){
    this.bookingServ.getByBookingRoomId(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resGetByBookingRoomId => {
      const room = {
        bookingRoomId: resGetByBookingRoomId.room.booking_room_id,
        bookingId: resGetByBookingRoomId.room.booking_id,
        roomTypeId: resGetByBookingRoomId.room.room_type_id,
        roomId: resGetByBookingRoomId.room.room_id,
        bookingRoomStatusId: resGetByBookingRoomId.room.booking_room_status_id,
        roomTypeName: resGetByBookingRoomId.room.room_type_name,
        baseAdult: resGetByBookingRoomId.room.base_adult,
        baseChild: resGetByBookingRoomId.room.base_child,
        maxAdult: resGetByBookingRoomId.room.max_adult,
        maxChild: resGetByBookingRoomId.room.max_child,
        baseRate: resGetByBookingRoomId.room.base_rate,
        increaseRate: resGetByBookingRoomId.room.increase_rate,
        totalRoom: resGetByBookingRoomId.room.total_room,
        roomDescription: resGetByBookingRoomId.room.room_description,
        createdAt: resGetByBookingRoomId.room.created_at,
        updateAt: resGetByBookingRoomId.room.updated_at,
        bookingRoomStatusName: resGetByBookingRoomId.room.booking_room_status_name,
      };

      const paymentList = resGetByBookingRoomId.payment_list.map((y) => {
        const data = {
          example: 'tes',
        };
        return y;
      });

      const chargeList = resGetByBookingRoomId.charge_list.map((y) => {
        const data = {
          chargeId: y.charge_id,
          taxId: y.tax_id,
          seasonId: y.season_id,
          bookingRoomId: y.booking_room_id,
          roomReservationId: y.room_reservation_id,
          paymentForDate: y.payment_for_date,
          discount: y.discount,
          chargeRate: y.charge_rate,
          chargeTax: y.charge_tax,
          chargeTotal: y.charge_total,
          chargeNote: y.charge_note,
          chargeStatus: y.charge_status,
          chargeCategory: y.charge_category,
          chargeCreatedAt: y.charge_created_at,
          chargeCreatedBy: y.charge_created_by,
          chargeUpdatedAt: y.charge_updated_at,
          chargeUpdatedBy: y.charge_updated_by,
          seasonTypeId: y.season_type_id,
          seasonName: y.season_name,
          fromDate: y.from_date,
          toDate: y.to_date,
          startDate: y.start_date,
          endDate: y.end_date,
          seasonStatus: y.season_status,
          seasonDescription: y.season_description,
          createdAt: y.created_at,
          createdBy: y.created_by,
          updatedAt: y.updated_at,
          updatedBy: y.updated_by,
          taxName: y.tax_name,
          taxRate: y.tax_rate,
          taxStatus: y.tax_status,
        };
        return data;
      });

      const extraCharge = resGetByBookingRoomId.extra_charge.map((y) => {
        const data = {
          example: 'tes',
        };
        return data;
      });

      const chargeTotal = {
        totalCharge: resGetByBookingRoomId.charge_total.total_charge,
        totalTax: resGetByBookingRoomId.charge_total.total_tax,
        totalRate: resGetByBookingRoomId.charge_total.total_rate,
        discount: resGetByBookingRoomId.charge_total.discount,
      };

      
      this.chargeTotal = chargeTotal;
      this.extraCharge = extraCharge;
      this.room = room;
      this.paymentList = paymentList;
      this.chargeList = chargeList;

      if(this.bookingData.bookingStatusName === "BOOKING") {
        this.show.button.assignRoom = false;
        this.addingPayment.totalPaid = this.chargeTotal.totalCharge ;
        console.log('[resGetByBookingRoomId - addingPayment]' ,this.addingPayment);
      }else{
        this.show.notFound.deposit = false;
        this.show.notFound.payment = false;
        this.show.button.assignRoom = true;
      }

      this.roomTypeId = {
        id: this.room.roomTypeId,
      };
      this.roomOperationServ.getByRoomTypeIdAndRoomStatus(this.roomTypeId).pipe(takeUntil(this.subs)).subscribe(resRoomOperation => {
        this.floorServ.get().pipe(takeUntil(this.subs)).subscribe(resFloor => {
          this.roomTypeServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomType => {
            this.roomStatusServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomStatus => {
              const data = resRoomOperation.map((forResRoom) => {
                const filterResFloor = resFloor.filter((abc) => {
                  return abc.floor_id === forResRoom.floor_id && abc.floor_db_status === 'active';
                });
                const filterResRoomType = resRoomType.filter((def) => {
                  return def.room_type_id === forResRoom.room_type_id;
                });
                const filterResRoomStatus = resRoomStatus.filter((ghi) => {
                  return ghi.room_status_id === forResRoom.room_status_id;
                });
                const DataForResRoomType = {
                  roomId: forResRoom.room_id,
                  roomName: forResRoom.room_name,
                  roomtypeId: forResRoom.room_type_id,
                  roomTypeName: filterResRoomType[0].room_type_name,
                  floorId: forResRoom.floor_id,
                  floorName: filterResFloor[0].floor_name,
                  roomStatusId: forResRoom.room_status_id,
                  roomStatusName: filterResRoomStatus[0].room_status_name,
                  roomDbStatus: forResRoom.room_db_status,
                  createdAt: forResRoom.created_at,
                  updatedAt: forResRoom.updated_at,
                  createdBy: forResRoom.created_by,
                  updatedBy: forResRoom.updated_by,
                };
                return DataForResRoomType;
              });
              this.assignRoom = data;
              console.log('[assign room]', this.assignRoom );
            });
          });
        });
      }, err => {

      });
      console.log('roomTypeId-resGetByBookingRoomId', this.roomTypeId);
      console.log('[chargeTotal]', chargeTotal);
      console.log('[extraCharge]', extraCharge);
      console.log('[chargeList]', chargeList);
      console.log('[room]', room);
      console.log('[paymentList]', paymentList);
    });
  }

  roomList() {
    console.log('[selectedRowsRoomList]', this.selectedRowsRoomList)
    this.show.button.roomList = false;
    this.show.button.room = true;
    this.show.tab.generalInformation = false;
    this.show.tab.roomList = false;
    this.show.tab.roomInformation = true;
    this.show.tab.payment = true;
    this.show.tab.extraCharge = true;
    this.show.tab.extraPayment = true;
    this.show.tab.deposit = true;
    this.show.select.roomTypeId = true;
    this.show.tabActive.roomInformation = true;
    this.filterSelectedRowsRoomList.bookingRoomId = this.selectedRowsRoomList[0].bookingRoomId;
    this.bookingRoomId = this.selectedRowsRoomList[0].bookingRoomId;
    this.roomTypeId = this.selectedRowsRoomList[0].bookingRoomTypeId;
    const data = {
      id: this.selectedRowsRoomList[0].bookingRoomId,
    };
    this.resGetByBookingRoomId(data);
  }

  changeRoomType(event) {
    console.log(event);
    this.bookingRoomId = event;
    this.roomTypeId = this.room.roomTypeId;
    const data = {
      id: event,
    };
    this.resGetByBookingRoomId(data);
  }

  backToRoomList() {
    this.show.button.roomList = true;
    this.show.button.room = false;
    this.show.tab.generalInformation = true;
    this.show.tab.roomList = true;
    this.show.tab.roomInformation = false;
    this.show.tab.payment = false;
    this.show.tab.extraCharge = false;
    this.show.tab.extraPayment = false;
    this.show.tab.deposit = false;
    this.show.select.roomTypeId = false;
    this.show.tabActive.roomInformation = false;
    this.show.tabActive.generalInformation = true;
  }

  toCharge() {
    this.show.add.charge = true;
    this.show.add.deposit = false;
    this.show.add.extraCharge = false;
    this.show.add.extraPayment = false;
    this.show.add.payment = false;

    this.show.notFound.charge = false;
  }

  toDeposit() {
    this.show.add.charge = false;
    this.show.add.deposit = true;
    this.show.add.extraCharge = false;
    this.show.add.extraPayment = false;
    this.show.add.payment = false;

    this.show.notFound.deposit = false;
  }

  toPayment() {
    this.show.add.charge = false;
    this.show.add.deposit = false;
    this.show.add.extraCharge = false;
    this.show.add.extraPayment = false;
    this.show.add.payment = true;

    this.show.notFound.payment = false;

  }

  toExtraPayment() {
    this.show.add.charge = false;
    this.show.add.deposit = false;
    this.show.add.extraCharge = false;
    this.show.add.extraPayment = true;
    this.show.add.payment = false;

    this.show.notFound.extraPayment = false;
  }

  toExtraCharge() {
    this.show.add.charge = false;
    this.show.add.deposit = false;
    this.show.add.extraCharge = true;
    this.show.add.extraPayment = false;
    this.show.add.payment = false;

    this.show.notFound.extraCharge = false;
  }

  addPayment() {
    const data = {
      bookingRoomId: this.bookingRoomId,
      paymentTypeId: this.addingPayment.paymentTypeId,
      totalPaid: this.addingPayment.totalPaid,
      paymentNote: this.addingPayment.paymentNote,
      createdBy: this.userCityHub.name,
      paymentRemark: this.addingPayment.paymentRemark,
    };

    console.log('[data-add-apyment]', data);
    this.bookingServ.addPayment(data).pipe(takeUntil(this.subs)).subscribe(resAddPayment => {
      console.log('[add-payment]', resAddPayment);
      const title = 'Add Payment';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);

      this.show.button.roomList = true;
      this.show.button.room = false;
      this.show.tab.generalInformation = true;
      this.show.tab.roomList = true;
      this.show.tab.roomInformation = false;
      this.show.tab.payment = false;
      this.show.tab.extraCharge = false;
      this.show.tab.extraPayment = false;
      this.show.tab.deposit = false;
      this.show.select.roomTypeId = false;
      this.show.tabActive.roomInformation = false;
      this.show.tabActive.generalInformation = true;
    }, err => {
      const title = 'Add Payment';
      const content = 'Data has been not save';
      this.notifServ.showSuccessTypeToast(title, content);
    });
  }

  addDeposit() {
    const data = {
      bookingRoomId: this.bookingRoomId,
      paymentTypeId: this.addingDeposit.paymentTypeId,
      totalPaid: this.addingDeposit.totalPaid,
      paymentNote: this.addingDeposit.paymentNote,
      createdBy: this.userCityHub.name,
      paymentRemark: this.addingDeposit.paymentRemark,
    };

    console.log('[data-add-apyment]', data);
    this.bookingServ.addDeposit(data).pipe(takeUntil(this.subs)).subscribe(resAddPayment => {
      console.log('[add-payment]', resAddPayment);
      const title = 'Add Deposit';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);

      this.show.button.roomList = true;
      this.show.button.room = false;
      this.show.tab.generalInformation = true;
      this.show.tab.roomList = true;
      this.show.tab.roomInformation = false;
      this.show.tab.payment = false;
      this.show.tab.extraCharge = false;
      this.show.tab.extraPayment = false;
      this.show.tab.deposit = false;
      this.show.select.roomTypeId = false;
      this.show.tabActive.roomInformation = false;
      this.show.tabActive.generalInformation = true;
    }, err => {
      const title = 'Add Deposit';
      const content = 'Data has been not save';
      this.notifServ.showSuccessTypeToast(title, content);
    });
  }

  toAssignRoom() {
    this.show.view.assignRoom = true;
  }

  addRoom(event) {
    const data = {
      bookingRoomId: this.bookingRoomId,
      roomId: event,
    };
    this.bookingServ.assignRoom(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resAssignRoom => {
      const title = 'Assign Room';
      const content = 'Assign room successfully';
      this.notifServ.showSuccessTypeToast(title, content);
    })
  }

  checkIn() {
    const timeString= this.datepipe.transform(Date.now(), 'shortTime');
    if (timeString >= "05.00 AM" && timeString <= "10.00 AM" ) {
      this.earlyCheckin = true;
    }

    const data = {
      bookingId: this.bookingData.bookingId,
      checkinBy: this.userCityHub.name,
      earlyCheckin:  this.earlyCheckin,
    };

    this.bookingServ.checkIn(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resCheckIn => {
      const title = 'Checkin';
      const content = 'Checkin successfully';
      this.notifServ.showSuccessTypeToast(title, content);
      console.log('[resCheckIn]', resCheckIn);
    })

    console.log('[check-in]', data);
  }

  checkOut() {
    const timeString= this.datepipe.transform(Date.now(), 'shortTime');
    console.log('[timeString]' ,timeString);
    if (timeString >= "1.00 PM" && timeString <= "3.00 PM" ) {
      this.lateCheckout = true;
    }

    if (timeString >= "1.00 PM" && timeString <= "2.00 PM" ) {
      this.lateCheckoutRate = '25';
    }
    
    if (timeString >= "2.01 AM" && timeString <= "3.00 PM" ) {
      this.lateCheckoutRate = '50';
    }

    if (timeString >= "3.01 AM") {
      this.router.navigate(['pages/add-stay']);
    }


    const data = {
      bookingId: JSON.stringify(this.bookingData.bookingId),
      checkoutBy: this.userCityHub.name,
      lateCheckout:  this.lateCheckout,
      lateCheckoutRate: this.lateCheckoutRate,
    };

    console.log('[checkOut]' ,data);
    this.bookingServ.checkOut(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resCheckIn => {
      const title = 'Checkout';
      const content = 'Checkout successfully';
      this.notifServ.showSuccessTypeToast(title, content);
      console.log('[resCheckIn]', resCheckIn);
    })
  }
}
