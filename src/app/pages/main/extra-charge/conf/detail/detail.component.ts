import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  extarChangeCategory: any;
  userCityHub: any;
  extraCharge: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public authServ: AuthService,
    private notifServ: NotificationService,
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getExtraChargeCategory() {
    this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraChargeCategory => {
      this.extarChangeCategory = resExtraChargeCategory.map((forResExtraChargeCategory) => {
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
      this.extarChangeCategory.getById(roomOperationId).pipe(takeUntil(this.subs)).subscribe(resById => {
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

}
