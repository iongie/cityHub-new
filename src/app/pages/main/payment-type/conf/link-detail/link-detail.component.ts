import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { PaymentTypeService } from '../../../../../services/payment-type/payment-type.service';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss']
})
export class LinkDetailComponent implements OnInit, OnDestroy, ViewCell {
  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  items = [
    { title: 'View',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
        status: '',
      },
    },
    { title: 'Change Status',
      icon: 'fas fa-exchange-alt',
      data: {
        id: '',
        status: '',
      },
    },
  ];
  data: any[];
  constructor(
    private nbMenuService: NbMenuService,
    private paymentTypeServ: PaymentTypeService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.paymentTypeId;
    this.action();
    this.viewOption();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewOption() {
    const dataMap = this.items.map((y) => {
      const abc = {
        title: y.title,
        icon: y.icon,
        data: {
          id: this.value.paymentTypeId,
          status: this.value.paymentTypeStatus,
        },
      };
      return abc;
    });
    if (this.value.paymentTypeRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.paymentTypeRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'payment-type'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        console.log('v', item.data.id );
        this.router.navigate(['/pages/view-payment-type', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
        console.log('cs', this.renderValue);
        const data = {
          id: this.renderValue,
        };
        if (item.data.status === 'active') {
          this.paymentTypeServ.inactiveAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Payment Type';
            const content = 'Payment Type has been inactived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        } else if (item.data.status === 'inactive') {
          this.paymentTypeServ.activeAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Payment Type';
            const content = 'Payment Type has been actived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        }
      }
    });
  }

}
