import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { DetailBookingByBookingId } from '../../booking';
import { LocalDataSource } from 'ng2-smart-table';
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
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { LinkDetailComponent } from './link-detail/link-detail.component';

@Component({
  selector: 'ngx-room-information',
  templateUrl: './room-information.component.html',
  styleUrls: ['./room-information.component.scss'],
})
export class RoomInformationComponent implements OnInit, OnDestroy {
  detailBookingByBookingId: LocalDataSource;
  private subs: Subject<void> = new Subject();
  @Input() value: any;
  show: any;
  forRole: any;
  settings = {
    actions: false,
    columns: {
      roomTypeName: {
        title: 'Room Type',
        type: 'string',
      },
      arrivalDate: {
        title: 'Guest name',
        type: 'string',
      },
      departureDate: {
        title: 'Business Source name',
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
    private activeRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.roomInformation();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  roomInformation() {
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
          const booking = {
            id: params.id,
          };
          this.bookingServ.getBookingInformation(booking)
          .pipe(takeUntil(this.subs))
          .subscribe(() => {
            this.detailBookingByBookingId = new LocalDataSource(this.value.roomInformation);
            console.log('[1223]', this.value);
          });
        });
      });
    });
  }

}
