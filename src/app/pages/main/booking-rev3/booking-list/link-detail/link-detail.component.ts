import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { BookingService } from '../../../../../services/booking-rev3/booking.service';
import { NotificationService } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'ngx-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss'],
})
export class LinkDetailComponent implements OnInit, OnDestroy {
  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  items = [
    { title: 'Detail',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
        number: '',
      },
    },
    { title: 'Cancel Booking',
      icon: 'fa fa-times',
    },
  ];
  data: any;
  constructor(
    private nbMenuService: NbMenuService,
    private router: Router,
    private bookingServ: BookingService,
    private notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.renderValue  = this.value.id;
    this.action();
    this.viewOption();
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
          id: this.value.id,
          number: this.value.number,
        },
      };
      return xyz;
    });
    this.data = dataMap;
  }

  action() {
    this.nbMenuService.onItemClick()
    .pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'booking'),
      map(({item}) => item),
    )
    .subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'Detail') {
        this.router.navigate(['pages/booking-detail/' + this.renderValue]);
      }

      if (item.data.id === this.renderValue && item.title === 'Cancel Booking') {
        console.log('this.renderValue', this.renderValue);
        const booking = {
          id: this.renderValue,
        };
        const data = {
          bookingId: this.renderValue,
          cancelBy: '',
          cancelReason: 'Cancel Booking',
        };
        this.bookingServ.cancelBookingByBookingId(booking, data)
        .pipe(takeUntil(this.subs))
        .subscribe(() => {
          const title = 'Cancel booking number:' + this.renderValue;
          const content = 'Successfully';
          setTimeout(() => {
            this.notifServ.showSuccessTypeToast(title, content);
          });
        });
      }
    });
  }

}
