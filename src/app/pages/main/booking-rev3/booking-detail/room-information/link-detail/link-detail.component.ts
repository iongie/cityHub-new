import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../../services/notification/notification.service';
import { BookingService } from '../../../../../../services/booking-rev3/booking.service';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss'],
})
export class LinkDetailComponent implements OnInit, OnDestroy {
  renderId: any;
  renderNumber: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  items = [
    { title: 'Detail Room',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
        number: '',
      },
    },
    { title: 'Cancel Room',
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
    this.renderId  = this.value.id;
    this.renderNumber  = this.value.number;
    console.log('[value]', this.value);
    this.viewOption();
    this.action();
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
      filter(({ tag }) => tag === 'booking-room'),
      map(({item}) => item),
    )
    .subscribe(item => {
      if (item.title === 'Detail Room') {
        console.log('[this.data.number]', this.data.number);
        this.router.navigate(['pages/booking-detail/' + this.renderNumber + '/' + this.renderId]);
      }

      if (item.title === 'Cancel Room') {

      }
    });
  }

}
