import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { PaymentTypeService } from '../../../../../services/payment-type/payment-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  paymentType: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private paymentTypeServ: PaymentTypeService,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const paymentTypeId = {
        id: params.id,
      };
      this.paymentTypeServ.getById(paymentTypeId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((y) => {
          const xyz = {
            paymentTypeId: y.payment_type_id,
            paymentTypeName: y.payment_type_name,
          };
          return xyz;
        });
        this.paymentType = data;
        console.log('this.paymentType', this.paymentType);
      });
    });
  }

  updatePaymentType() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        userId: params.id,
        paymentTypeId: this.paymentType[0].paymentTypeId,
        paymentTypeName: this.paymentType[0].paymentTypeName,
      };
      this.paymentTypeServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Payment type';
        const content = 'Data has been updated';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/payment-type']);
      }, err => {
        const title = 'User';
        const content = 'Error Data';
        this.notifServ.showInfoTypeToast(title, content);
      });
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

      console.log(this.forRole);

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
