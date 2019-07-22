import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  extraChargeCategory: any;
  userCityHub: any;
  extraCharge: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.getExtraChargeCategory();
    this.viewById();
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
      console.log(this.userCityHub);
    });
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const roomOperationId = {
        id: params.id,
      };
      this.extraChargeServ.getById(roomOperationId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((y) => {
          const xyz = {
            extraChargeName: y.extra_charge_name,
            extraChargeCategoryId: y.extra_charge_category_id,
            extraChargeRate: y.extra_charge_rate,
            extraChargeDescription: y.extra_charge_description,
            createdAt: y.created_at,
            updatedAt: y.updated_at,
            createdBy: y.created_by,
            updatedBy: y.updated_by,
          };
          return xyz;
        });
        this.extraCharge = data;
        console.log(this.extraCharge);
      });
    });
  }

  updateExtraCharge() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        roomId: params.id,
        extraChargeName: this.extraCharge[0].extraChargeName,
        extraChargeCategoryId: this.extraCharge[0].extraChargeCategoryId,
        extraChargeRate: this.extraCharge[0].extraChargeRate,
        extraChargeDescription: this.extraCharge[0].extraChargeDescription,
        updateBy: this.userCityHub.username,
        createBy: this.userCityHub.username,
      };
      this.extraChargeServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Extra charge';
        const content = 'Data has been update';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/extra-charge']);
      }, err => {
        const title = 'Extra charge';
        const content = 'Error';
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
