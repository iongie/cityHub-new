import { Component, OnInit, OnDestroy } from '@angular/core';
import { DiscountService } from '../../../services/discount/discount.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusComponent } from './status/status.component';
import { LinkToDetailComponent } from './link-to-detail/link-to-detail.component';

@Component({
  selector: 'ngx-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss'],
})
export class DiscountComponent implements OnInit, OnDestroy {
  discount: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      discountId: {
        title: 'Name',
        type: 'string',
      },
      discountName: {
        title: 'Name',
        type: 'string',
      },
      discountRate: {
        title: 'Rate',
        type: 'string',
      },
      discountFromDate: {
        title: 'From Date',
        type: 'string',
      },
      discountToDate: {
        title: 'To Date',
        type: 'string',
      },
      discountCreatedAt: {
        title: 'Created At',
        type: 'string',
      },
      discountUpdateAt: {
        title: 'Update At',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusComponent,
        filter: false,
      },
      detail: {
        title: 'Actions',
        type: 'custom',
        renderComponent: LinkToDetailComponent,
        filter: false,
      },
    },
  };

  filterMenu: any;
  constructor(
    public discountServ: DiscountService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.get();
    this.refreshDiscount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  get() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'discount_module';
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

        const menu = {
          name: 'on',
        };

        this.discountServ.get(menu)
        .pipe(takeUntil(this.subs))
        .subscribe(resDiscount => {
          const data = resDiscount.map(x => {
            const ccc = {
              discountId: x.discount_id,
              discountName: x.discount_name,
              discountRate: x.discount_rate,
              discountStatus: x.discount_status,
              discountFromDate: x.discount_form_date,
              discountToDate: x.discount_to_date,
              discountCreatedAt: x.discount_created_at,
              discountUpdateAt: x.discount_updated_at,
              status: {
                discountStatus: x.discount_status,
              },
              detail: {
                discountId: x.discount_id,
                discountStatus: x.discount_status,
                discountRoleCreate: filter[0].create_permision,
                discountRoleRead: filter[0].read_permision,
                discountRoleUpdate: filter[0].update_permision,
                discountRoleDelete: filter[0].delete_permision,
              },
            };
            return ccc;
          });

          this.discount = new LocalDataSource(data);
        });
      });
    });
  }

  refreshDiscount() {
    this.discountServ.refresh.subscribe(() => {
      this.get();
    });
  }

  filter() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'discount_module';
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

        const menu = {
          name: this.filterMenu,
        };

        this.discountServ.get(menu)
        .pipe(takeUntil(this.subs))
        .subscribe(resDiscount => {
          const data = resDiscount.map(x => {
            const ccc = {
              discountId: x.discount_id,
              discountName: x.discount_name,
              discountRate: x.discount_rate,
              discountStatus: x.discount_status,
              discountFromDate: x.discount_form_date,
              discountToDate: x.discount_to_date,
              discountCreatedAt: x.discount_created_at,
              discountUpdateAt: x.discount_updated_at,
            };
            return ccc;
          });

          this.discount = new LocalDataSource(data);
        });
      });
    });
  }

  toFormAdd() {
    this.router.navigate(['pages/add-discount']);
  }

}
