import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { PaymentTypeService } from '../../../services/payment-type/payment-type.service';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusComponent } from './conf/status/status.component';

@Component({
  selector: 'ngx-payment-type',
  templateUrl: './payment-type.component.html',
  styleUrls: ['./payment-type.component.scss']
})
export class PaymentTypeComponent implements OnInit, OnDestroy {
  
  paymentType: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      paymentTypeName: {
        title: 'Type',
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
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };

  constructor(
    public paymentTypeServ: PaymentTypeService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getPaymentType();
    this.refreshPaymentType();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getPaymentType() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
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
          name: 'all'
        }
        
        this.paymentTypeServ.get(menu).pipe(takeUntil(this.subs)).subscribe(paymentType => {
         
          const data = paymentType.map((y) => {
            const abc = {
              paymentTypeId: y.payment_type_id,
              paymentTypeName: y.payment_type_name,
                status: {
                  paymentTypeStatus: y.payment_type_db_status,
                },
                detail: {
                  paymentTypeId: y.payment_type_id,
                  paymentTypeStatus: y.payment_type_db_status,
                  paymentTypeRoleCreate: filter[0].create_permision,
                  paymentTypeRoleRead: filter[0].read_permision,
                  paymentTypeRoleUpdate: filter[0].update_permision,
                  paymentTypeRoleDelete: filter[0].delete_permision,
                },
              };
              return abc;
            });
            this.paymentType = new LocalDataSource (data);
            console.log('data', data);
          });
        });
      });
  }

  refreshPaymentType() {
    this.paymentTypeServ.refresh.subscribe(() => {
      this.getPaymentType();
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-payment-type']);
  }
}
