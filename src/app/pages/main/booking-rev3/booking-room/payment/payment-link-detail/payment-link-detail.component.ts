import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { BookingService } from '../../../../../../services/booking-rev3/booking.service';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-payment-link-detail',
  templateUrl: './payment-link-detail.component.html',
  styleUrls: ['./payment-link-detail.component.scss'],
})
export class PaymentLinkDetailComponent implements OnInit, OnDestroy {
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
      filter(({ tag }) => tag === 'payment'),
      map(({item}) => item),
    )
    .subscribe(item => {
      if (item.title === 'Detail') {
        this.router.navigate(['pages/edit-payment/' + this.renderValue]);
      }
    });
  }
}
