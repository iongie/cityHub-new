import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, filter, map } from 'rxjs/operators';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { MiscellaneousSalesService } from '../../../../services/miscellaneous-sales/miscellaneous-sales.service';
import { NotificationService } from '../../../../services/notification/notification.service';

@Component({
  selector: 'ngx-miscellaneous-sales-link',
  templateUrl: './miscellaneous-sales-link.component.html',
  styleUrls: ['./miscellaneous-sales-link.component.scss'],
})
export class MiscellaneousSalesLinkComponent implements OnInit, OnDestroy {
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
    { title: 'Cancel Miscellaneous Sales',
      icon: 'fa fa-times',
    },
  ];
  data: any;
  constructor(
    private nbMenuService: NbMenuService,
    private router: Router,
    public miscellaneousSalesServ: MiscellaneousSalesService,
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
      filter(({ tag }) => tag === 'miscSales'),
      map(({item}) => item),
    )
    .subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'Detail') {
        this.router.navigate(['pages/detail-miscellaneous-sales/' + this.renderValue]);
      }

      if (item.data.id === this.renderValue && item.title === 'Cancel Miscellaneous Sales') {
        console.log('this.renderValue', this.renderValue);
        const data = {
          miscSalesId: this.renderValue,
          cancelBy: '',
          cancelReason: 'Cancel Miscellaneous Sales',
        };
        this.miscellaneousSalesServ.cancelMiscByGroup(data)
        .pipe(takeUntil(this.subs))
        .subscribe(() => {
          const title = 'Cancel Miscellaneous Sales number:' + this.renderValue;
          const content = 'Successfully';
          setTimeout(() => {
            this.notifServ.showSuccessTypeToast(title, content);
          });
        });
      }
    });
  }

}
