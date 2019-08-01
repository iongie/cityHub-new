import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaxService } from '../../../services/tax/tax.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { StatusComponent } from './conf/status/status.component';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';

@Component({
  selector: 'ngx-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
})
export class TaxComponent implements OnInit, OnDestroy {
  tax: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      taxName: {
        title: 'Name',
        type: 'string',
      },
      taxRate: {
        title: 'Rate',
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
    public taxServ: TaxService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getTax();
    this.refreshExtraCharge();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getTax() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };
      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'tax_module';
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

        this.taxServ.get().pipe(takeUntil(this.subs)).subscribe(tax => {
          const data = tax.map((y) => {
            const abc = {
              taxId: y.tax_id,
              taxName: y.tax_name,
              taxRate: y.tax_rate,
              taxStatus: y.tax_status,
              updateAt: y.update_at,
              updateBy: y.update_by,
              createBy: y.create_by,
              createAt: y.create_at,
              status: {
                taxStatus: y.tax_status,
              },
              detail: {
                taxId: y.tax_id,
                taxStatus: y.tax_status,
                taxRoleCreate: filter[0].create_permision,
                taxRoleRead: filter[0].read_permision,
                taxRoleUpdate: filter[0].update_permision,
                taxRoleDelete: filter[0].delete_permision,
              },
            };
            return abc;
          });
          this.tax = new LocalDataSource (data);
        });
      });
    });
  }

  refreshExtraCharge() {
    this.taxServ.refresh.subscribe(() => {
      this.getTax();
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-tax']);
  }

}
