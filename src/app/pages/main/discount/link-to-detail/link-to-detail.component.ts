import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { DiscountService } from '../../../../services/discount/discount.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-link-to-detail',
  templateUrl: './link-to-detail.component.html',
  styleUrls: ['./link-to-detail.component.scss'],
})
export class LinkToDetailComponent implements OnInit, OnDestroy, ViewCell {
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
    public discountServ: DiscountService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.discountId;
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
          id: this.value.discountId,
          status: this.value.discountStatus,
        },
      };
      return xyz;
    });
    // this.data = dataMap;
    if (this.value.discountRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.discountRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'discount'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        this.router.navigate(['/pages/view-discount', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
        const data = {
          id: this.renderValue,
        };
        if (item.data.status === 'active') {
          this.discountServ.inactive(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Discount';
            const content = 'Discount has been inactived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        } else if (item.data.status === 'inactive') {
          this.discountServ.active(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Discount';
            const content = 'Discount has been actived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        }
      }
    });
  }
}
