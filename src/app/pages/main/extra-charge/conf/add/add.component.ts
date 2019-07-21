import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

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
  extarChangeCategory: any;
  userCityHub: any;
  private subs: Subject<void> = new Subject();
  constructor(
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public authServ: AuthService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getExtraChargeCategory();
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

  addExtraCharge() {
    const data = {
      extraChargeName: this.extraCharge.extraChargeName,
      extraChargeCategoryId: this.extraCharge.extraChargeCategoryId,
      extraChargeRate: this.extraCharge.extraChargeRate,
      extraChargeDescription: this.extraCharge.extraChargeDescription,
      createdBy: this.userCityHub.username,
    };
    this.extarChangeCategory.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
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


}
