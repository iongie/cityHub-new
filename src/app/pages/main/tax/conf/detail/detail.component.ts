import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { TaxService } from '../../../../../services/tax/tax.service';
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
  tax: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private taxService: TaxService,
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
      const taxId = {
        id: params.id,
      };
      this.taxService.getById(taxId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((y) => {
          const xyz = {
            taxName: y.tax_name,
            taxDesc: y.tax_rate,
            taxId: y.tax_id,
          };
          return xyz;
        });
        this.tax = data;
        console.log('this.tax', this.tax);
      });
    });
  }

  updateTax() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        userId: params.id,
        taxDescription: this.tax[0].taxDesc,
        taxId: this.tax[0].taxId,
        taxName: this.tax[0].taxName,
      };
      this.taxService.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Tax';
        const content = 'Data has been updated';
        this.notifServ.showSuccessTypeToast(title, content);
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
