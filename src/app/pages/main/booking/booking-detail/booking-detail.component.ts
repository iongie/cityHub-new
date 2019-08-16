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
import { PaymentTypeService } from '../../../../services/payment-type/payment-type.service';
import { NbMenuService } from '@nebular/theme';
import { takeUntil, map } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  show = {
    role : false,
    button: {
      roomList: false,
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
  chargeTotal = {
    totalCharge: '',
    totalTax: '',
    totalRate: '',
    discount: '',
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
  selectedRowsRoomList: any;
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
  ) { }

  ngOnInit() {
    this.view();
    this.refreshView();
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

      console.log(this.forRole);

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

            resGetByBookingId.room_list.map((y) => {
              const data = {
                id: y.booking_room_id,
              };
              this.bookingServ.getByBookingRoomId(data)
              .pipe(takeUntil(this.subs))
              .subscribe(resGetByBookingRoomId => {
                const room = {
                  bookingRoomId: resGetByBookingRoomId.room.booking_room_id,
                  bookingId: resGetByBookingRoomId.room.booking_id,
                  roomTypeId: resGetByBookingRoomId.room.room_type_id,
                  roomId: resGetByBookingRoomId.room.room_id,
                  bookingRoomStatusId: resGetByBookingRoomId.room.booking_room_status_id,
                  roomTypename: resGetByBookingRoomId.room.room_type_name,
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
                  return data;
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

                console.log('[chargeTotal]'+ data.id, chargeTotal);
                console.log('[extraCharge]'+ data.id, extraCharge);
                console.log('[chargeList]'+ data.id, chargeList);
                console.log('[room]'+ data.id, room);
                console.log('[paymentList]', paymentList);
              });
            });
            console.log('[roomListBooking]', roomListBooking);
            console.log('[bookingData]', bookingData);
          });
        });
      });
      
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
    this.selectedRowsRoomList = event.selected;
  }

  roomList() {
    const selectedRowsRoomList = this.selectedRowsRoomList.map((y) => {
      const data = {
        bookingRoomTypeId: y.bookingRoomTypeId,
      };
      return data;
    });
    console.log(selectedRowsRoomList);
    const dataSelectedRowsRoomList = selectedRowsRoomList.map((y) =>{
      const data = {
        id: y.bookingRoomTypeId,
      };
     return this.bookingServ.getByBookingRoomId(data)
      .pipe(
        map(x => {
          return x;
        })
      );
    });

    console.log('[dataSelectedRowsRoomList]', dataSelectedRowsRoomList);
   
    this.show.button.roomList = false;
    this.show.tab.generalInformation = false;
    this.show.tab.roomList = false;
    this.show.tab.roomInformation = true;
    this.show.tab.payment = true;
    this.show.tab.extraCharge = true;
    this.show.tab.extraPayment = true;
    this.show.tab.deposit = true;
  }

  

}
