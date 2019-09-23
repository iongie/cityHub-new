import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DiscountService } from '../../../../services/discount/discount.service';
import { NotificationService } from '../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  discount = {
    discountName: '',
    discountRate: 0,
    discountFromDate: new Date(),
    discountToDate: new Date(),
  };
  private subs: Subject<void> = new Subject();
  userCityHub: any;
  forRole: any;
  show: any;
  constructor(
    public discountServ: DiscountService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  save() {
    this.discountServ.add(this.discount)
    .pipe(takeUntil(this.subs))
    .subscribe(resAddDiscount => {
      const title = 'Discount';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/discount-management']);
    }, err => {
      const title = 'Discount';
      const content = 'Error';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/discount-management']);
    });
  }

  detailUserRole() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
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
      });
    });
  }
}
