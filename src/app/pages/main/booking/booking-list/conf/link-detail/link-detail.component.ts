import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { BookingService } from '../../../../../../services/booking/booking.service';
import { BusinessSourceService } from '../../../../../../services/business-source/business-source.service';
import { GuestService } from '../../../../../../services/guest/guest.service';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { AuthService } from '../../../../../../services/auth/auth.service';
import { UserRoleService } from '../../../../../../services/user-role/user-role.service';
import { RoomOperationService } from '../../../../../../services/room-operation/room-operation.service';
import { RoomTypeService } from '../../../../../../services/room-type/room-type.service';
import { DatePipe } from '@angular/common';
import { CountryService } from '../../../../../../services/country/country.service';
import { Router } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss']
})
export class LinkDetailComponent implements OnInit, OnDestroy {
  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  items = [
    { 
      title: 'Charge List',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
      },
    },
  ];
  data: any[];
  constructor(
    private nbMenuService: NbMenuService,
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
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.bookingId;
    this.viewOption();
    this.action();
    console.log(this.renderValue);
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewOption() {
    const dataMap = this.items.map((y) => {
      const xyz = {
        title: y.title,
        icon: y.icon,
        data: {
          id: this.value.bookingId,
        },
      };
      return xyz;
    });
    if (this.value.bookingRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.bookingRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'Charge List';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'booking'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'Charge List') {
        this.router.navigate(['/pages/booking-detail', this.renderValue]);
      }
    });
  }

}
