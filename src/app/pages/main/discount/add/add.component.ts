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
    discountFormDate: new Date(),
    discountToDate: new Date(),
  };
  private subs: Subject<void> = new Subject();
  constructor(
    public discountServ: DiscountService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {

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

  cancel() {
    this.router.navigate(['pages/discount-management']);
  }
}
