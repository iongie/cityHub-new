import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { StatusComponent } from '../../extra-charge/conf/status/status.component';
import { LinkToDetailComponent } from '../link-to-detail/link-to-detail.component';
import { DiscountService } from '../../../../services/discount/discount.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  discount = {
    discountId: '',
    discountName: '',
    discountRate: 0,
    discountStatus: new Date(),
    discountFromDate: new Date(),
    discountToDate: new Date(),
    discountCreatedAt: new Date(),
    discountUpdateAt: new Date(),
  };
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  constructor(
    public discountServ: DiscountService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
    private activeRoute: ActivatedRoute,
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

        this.activeRoute.params.subscribe(params => {
          const data = {
            id: params.id,
          };
          this.discountServ.getById(data)
          .pipe(takeUntil(this.subs))
          .subscribe(resDiscount => {
            const ccc = {
              discountId: params.id,
              discountName: resDiscount.discount_name,
              discountRate: resDiscount.discount_rate,
              discountStatus: resDiscount.discount_status,
              discountFromDate: resDiscount.discount_form_date,
              discountToDate: resDiscount.discount_to_date,
              discountCreatedAt: resDiscount.discount_created_at,
              discountUpdateAt: resDiscount.discount_updated_at,
            };
            this.discount = ccc;
          });
        });

      });
    });
  }

  refreshDiscount() {
    this.discountServ.refresh.subscribe(() => {
      this.get();
    });
  }

  update() {
    const data = {
      discountName: this.discount.discountName,
      discountRate: this.discount.discountRate,
      discountStatus: this.discount.discountStatus,
      discountFromDate: this.discount.discountFromDate,
      discountToDate: this.discount.discountToDate,
    };

    this.discountServ.update(data)
    .pipe(takeUntil(this.subs))
    .subscribe(resAddDiscount => {
      const title = 'Discount';
      const content = 'Data has been update';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/discount-management']);
    }, err => {
      const title = 'Discount';
      const content = 'Error';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/discount-management']);
    });
  }
}
