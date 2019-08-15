import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { PaymentTypeService } from '../../../../../services/payment-type/payment-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  paymentType = {
    paymentTypeName: '',
  };
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private paymentTypeService: PaymentTypeService,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    ) { }

  ngOnInit() {
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  addPaymentType() {
    const data = {
      paymentTypeName: this.paymentType.paymentTypeName,
    };
    this.paymentTypeService.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Payment type';
      const content = 'Data has been Save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/payment-type']);
    }, err => {
      const title = 'User';
      const content = 'Error Data';
      this.notifServ.showInfoTypeToast(title, content);
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
          return forResUserRole.module_name === 'payment_type_module';
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
