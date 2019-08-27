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
import { Router } from '@angular/router';
import { Subject, combineLatest, zip } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { takeUntil } from 'rxjs/operators';

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
  userCityHub: any;
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
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getBooking() {
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
          return forResUserRole.module_name === 'extra_charge_module';
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

        const menu = {
          name: 'all'
        };
        combineLatest(
          this.bookingServ.get(menu),
          this.businessSourceServ.get(),
        )
        .pipe(takeUntil(this.subs))
        .subscribe( resBooking => {
            const dataBookingList = resBooking[0];
            const dataBusinessSource = resBooking[1];

            const data = dataBookingList.map(y => {
              const filterDataBusinnesSource = dataBusinessSource.filter(x => {
                return x.business_source_id === y.business_source_id;
              });
              const data = {
                bookingId: y.booking_id,
                guestId: y.guest_id,
                businessSourceId: y.businees_source_id,
                businessSourceName : filterDataBusinnesSource[0].business_source_name,
                bookingNumber: y.booking_number,
                bookingCreatedAt: y.booking_created_at,
                bookingCreatedBy: y.booking_created_by,
                bookingUpdatedAt: y.booking_updated_at,
                bookingUpdatedBy: y.booking_updated_by,
                cancelAt: y.cancel_at,
                cancelBy: y.cancel_by,
                cancelReason: y.cancel_reason,
                bookingStatusName: y.booking_status_name,
              };
              return data;
            });
          console.log('[resBooking]',data);
        }, err => {

        });
      });
    });
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(this.userCityHub);
    });
  }

  toFormAdd() {
    this.router.navigate(['pages/add-booking']);
  }

}
