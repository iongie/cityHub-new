import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  extraCharge = {
    extraChargeName: '',
    extraChargeCategoryId: '',
    extraChargeRate: '',
    extraChargeDescription: '',
  };
  extraChargeCategory: any;
  userCityHub: any;
  forRole: any;
  show: any;
  private subs: Subject<void> = new Subject();
  constructor(
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public authServ: AuthService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getExtraChargeCategory();
    this.detailAccount();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getExtraChargeCategory() {
    this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraChargeCategory => {
      this.extraChargeCategory = resExtraChargeCategory.map((forResExtraChargeCategory) => {
        const dataForRoomStatus = {
          extraChargeCategoryId: forResExtraChargeCategory.extra_charge_category_id,
          extraChargeCategoryName: forResExtraChargeCategory.extra_charge_category_name,
        };
        return dataForRoomStatus;
      });
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

  addExtraCharge() {
    const data = {
      extraChargeName: this.extraCharge.extraChargeName,
      extraChargeCategoryId: this.extraCharge.extraChargeCategoryId,
      extraChargeRate: this.extraCharge.extraChargeRate,
      extraChargeDescription: this.extraCharge.extraChargeDescription,
      createdBy: this.userCityHub.username,
    };
    this.extraChargeServ.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Extra charge';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/extra-charge']);
    }, err => {
      const title = 'Extra charge';
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
          return forResUserRole.module_name === 'extra_charge_module';
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
