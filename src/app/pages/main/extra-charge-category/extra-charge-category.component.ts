import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtraChargeCategoryService } from '../../../services/extra-charge-category/extra-charge-category.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';

@Component({
  selector: 'ngx-extra-charge-category',
  templateUrl: './extra-charge-category.component.html',
  styleUrls: ['./extra-charge-category.component.scss'],
})
export class ExtraChargeCategoryComponent implements OnInit, OnDestroy {
  extraChargeCategory: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      extraChargeCategoryName: {
        title: 'Name',
        type: 'string',
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
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getExtraChargeCategory();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getExtraChargeCategory() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'extra_charge_category_module';
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

        this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraChargeCategory => {
          const data = resExtraChargeCategory.map((forResExtraChargeCategory) => {
            const dataForResExtraChargeCategory = {
              extraChargeCategoryId: forResExtraChargeCategory.extra_charge_category_id,
              extraChargeCategoryName : forResExtraChargeCategory.extra_charge_category_name,
              detail: {
                extraChargeCategoryId: forResExtraChargeCategory.extra_charge_category_id,
                extraChargeCategoryRoleCreate: filter[0].create_permision,
                extraChargeCategoryRoleRead: filter[0].read_permision,
                extraChargeCategoryRoleUpdate: filter[0].update_permision,
                extraChargeCategoryRoleDelete: filter[0].delete_permision,
              },
            };
            return dataForResExtraChargeCategory;
          });
          this.extraChargeCategory = new LocalDataSource (data);
        });
      });
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-extra-charge-category']);
  }

}
