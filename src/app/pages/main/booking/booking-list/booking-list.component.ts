import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { CountryService } from '../../../../services/country/country.service';
import { BookingService } from '../../../../services/booking/booking.service';
import { BusinessSourceService } from '../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../services/guest/guest.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { RoomTypeService } from '../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../services/room-operation/room-operation.service';
import { takeUntil } from 'rxjs/operators';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';

@Component({
  selector: 'ngx-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit, OnDestroy {
  booking: LocalDataSource;
  private subs: Subject<void> = new Subject();
  businessSource: any;
  guest: any;
  forRole: any;
  show: any;
  menuBooking: any;
  userCityHub: any;
  settings = {
    actions: false,
    columns: {
      bookingNumber: {
        title: 'Booking number',
        type: 'string',
      },
      bookingGuestName: {
        title: 'Guest name',
        type: 'string',
      },
      bookingBusinessSourceName: {
        title: 'Business Source name',
        type: 'string',
      },
      bookingArrivalDate: {
        title: 'Arrival date',
        type: 'string',
      },
      bookingDepartureDate: {
        title: 'Departure date',
        type: 'string',
      },
      bookingStatusName: {
        title: 'Status',
        type: 'string',
      },
      detail: {
        title: 'Actions',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
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
  ) { }

  ngOnInit() {
    this.getBooking();
    this.refreshBooking();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getBooking() {
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

        this.menuBooking = {
          name: 'all',
        };
        this.bookingServ.get(this.menuBooking).pipe(takeUntil(this.subs)).subscribe(resBooking => {
          this.businessSourceServ.get().pipe(takeUntil(this.subs)).subscribe(resBusinessSource => {
            this.guestServ.get().pipe(takeUntil(this.subs)).subscribe(resGuest => {
              const dataBooking = resBooking.map((y) => {
                const filterBusinessSource = resBusinessSource.filter((forResBusinessSource) => {
                  return forResBusinessSource.business_source_id == y.business_source_id;
                });
                const filterGuest = resGuest.filter((forResGuest) => {
                  return forResGuest.guest_id == y.guest_id;
                });
                console.log('filterGuest', filterGuest);
                console.log('filterBusinessSource', filterBusinessSource);
                const fgh = {
                  bookingId: y.booking_id,
                  bookingGuestId: y.guest_id,
                  bookingGuestName: filterGuest[0].guest_name,
                  bookingStatusId: y.booking_status_id,
                  bookingStatusName: y.booking_status_name,
                  bookingBusinessSourceId: y.business_source_id,
                  bookingBusinessSourceName: filterBusinessSource[0].business_source_name,
                  bookingNumber: y.booking_number,
                  bookingArrivalDate: this.datepipe.transform(y.arrival_date, 'MMMM d, y'),
                  bookingDuration: y.duration,
                  bookingDepartureDate: this.datepipe.transform(y.departure_date, 'MMMM d, y'),
                  bookingTotalRoom: y.total_room,
                  bookingCreatedAt: y.booking_created_at,
                  bookingCreatedBy: y.booking_created_by,
                  bookingUpdatedAt: y.booking_updated_at,
                  bookingUpdatedBy: y.booking_updated_by,
                  bookingCheckinAt: y.checkin_at,
                  bookingCheckinBy: y.checkin_by,
                  bookingCheckoutAt: y.checkout_at,
                  bookingCheckoutBy: y.checkout_by,
                  bookingCancelAt: y.cancel_at,
                  bookingCancelBy: y.cancel_by,
                  bookingCancelReason: y.cancel_reason,
                  detail: {
                    bookingId: y.booking_id,
                    bookingRoleCreate: filter[0].create_permision,
                    bookingRoleRead: filter[0].read_permision,
                    bookingRoleUpdate: filter[0].update_permision,
                    bookingRoleDelete: filter[0].delete_permision,
                  },
                };
                return fgh;
              });
              this.booking = new LocalDataSource (dataBooking);
              console.log(resBooking);
            });
          });
        });
        
      });
    });
  }

  refreshBooking() {
    this.bookingServ.refresh.subscribe(() => {
      this.getBooking();
    });
  }

}
