import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TaxService } from '../../../../../services/tax/tax.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  tax = {
    taxName: '',
    taxRate: '',
  };
  privilege: any;
  userCityHub: any;
  forRole: any;
  show: any;
  private subs: Subject<void> = new Subject();
  constructor(
    public taxServ: TaxService,
    public router: Router,
    public notifServ: NotificationService,
    public authServ: AuthService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getPrivilege();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getPrivilege() {
    this.taxServ.get().pipe(takeUntil(this.subs)).subscribe(privilege => {
      const data = privilege.map((y) => {
        const xyz = {
          taxName: y.taxName,
          taxRate : y.taxName,
        };
        return xyz;
      });
      this.privilege = data;
    });
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
    });
  }

  addTax() {
    const data = {
      taxName: this.tax.taxName,
      taxRate: this.tax.taxRate,
      createdBy: this.userCityHub.username,
    };
    this.taxServ.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Tax';
      const content = 'Data has been saved';
      this.notifServ.showSuccessTypeToast(title, content);
    }, err => {
      const title = 'Tax';
      const content = 'Error';
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
          return forResUserRole.module_name === 'tax_module';
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
