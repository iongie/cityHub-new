import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { ExtraChargeService } from '../../../services/extra-charge/extra-charge.service';
import { ExtraChargeCategoryService } from '../../../services/extra-charge-category/extra-charge-category.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notification/notification.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { StatusComponent } from './conf/status/status.component';

@Component({
  selector: 'ngx-extra-charge',
  templateUrl: './extra-charge.component.html',
  styleUrls: ['./extra-charge.component.scss'],
})
export class ExtraChargeComponent implements OnInit, OnDestroy {
  extraCharge: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    actions: false,
    columns: {
      extraChargeName: {
        title: 'Name',
        type: 'string',
      },
      extraChargeCategoryName: {
        title: 'Type',
        type: 'string',
      },
      extraChargeRate: {
        title: 'Rate',
        type: 'string',
      },
      extraChargeStatus: {
        title: 'Status',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusComponent,
        filter: false,
      },
      detail: {
        title: 'Detail',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public extraChargeServ: ExtraChargeService,
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
   this.getExtraCharge();
   this.refreshExtraCharge();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getExtraCharge() {
    this.extraChargeServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraCharge => {
      this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(resExtraChargeCategory => {
        const data = resExtraCharge.map((y) => {
          const abc = resExtraChargeCategory.filter((z) => {
            return z.extra_charge_category_id === y.extra_charge_category_id;
          });
          const xyz = {
            createAt: y.created_at,
            createBy: y.created_by,
            extraChargeCategoryId: y.extra_charge_category_id,
            extraChargeCategoryName: abc[0].extra_charge_category_name,
            extraChargeId: y.extra_charge_id,
            extraChargeName: y.extra_charge_name,
            extraChargeRate: y.extra_charge_rate,
            extraChargeStatus: y.extra_charge_status,
            uploadAt: y.updated_at,
            uploadBy: y.updated_by,
            status: {
              extraChargeStatus: y.extra_charge_status,
            },
            detail: {
              extraChargeId: y.extra_charge_id,
              extraChargeStatus: y.extra_charge_status,
            },
          };
          return xyz;
        });
        console.log('data', data);
        this.extraCharge = new LocalDataSource (data);
      });
    }, err => {

    });
  }

  refreshExtraCharge() {
    this.extraChargeServ.refresh.subscribe(() => {
      this.getExtraCharge();
    });
  }

  toFormAdd() {
    this.router.navigate(['pages/extra-charge']);
  }

}
