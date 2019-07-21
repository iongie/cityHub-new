import { Component, OnInit, OnDestroy } from '@angular/core';
import { ExtraChargeCategoryService } from '../../../services/extra-charge-category/extra-charge-category.service';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-extra-charge-category',
  templateUrl: './extra-charge-category.component.html',
  styleUrls: ['./extra-charge-category.component.scss'],
})
export class ExtraChargeCategoryComponent implements OnInit, OnDestroy {
  extraChargeCategory: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      extra_charge_category_name: {
        title: 'Name',
        type: 'string',
      },
    },
  };
  constructor(
    public extraChargeCategoryServ: ExtraChargeCategoryService,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.getExtraChargeCategory();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getExtraChargeCategory() {
    this.extraChargeCategoryServ.get().pipe(takeUntil(this.subs)).subscribe(extraChargeCategoryServ => {
      this.extraChargeCategory = new LocalDataSource (extraChargeCategoryServ);
    });
  }

  onDeleteConfirm(event) {
      const data = {
        id: event.data.extra_charge_category_id,
      };
      this.extraChargeCategoryServ.delete(data).subscribe(() => {
        const title = 'Extra Charge Category';
        const content = 'Data has been deleted';
        setTimeout(() => {
          this.notifServ.showDangerTypeToast(title, content);
        }, 2000);
        event.confirm.resolve(event.newData);
        setTimeout(() => {
          this.getExtraChargeCategory();
        }, 1000);
      });
  }

  onUpdateConfirm(event) {
    const data = {
      extraChargeCategoryId: event.newData.extra_charge_category_id,
      extraChargeCategoryName : event.newData.extra_charge_category_name,
    };
    this.extraChargeCategoryServ.update(data).subscribe(() => {
      const title = 'Extra Charge Category';
      const content = 'Data has been updated';
      setTimeout(() => {
        this.notifServ.showInfoTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        this.getExtraChargeCategory();
      }, 1000);
    });
  }

  onCreateConfirm(event) {
    const data = {
      extraChargeCategoryName : event.newData.extra_charge_category_name,
    };
    this.extraChargeCategoryServ.add(data).subscribe(() => {
      const title = 'Extra Charge Category';
      const content = 'Data has been saved';
      setTimeout(() => {
        this.notifServ.showSuccessTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        event.confirm.resolve(event.newData);
        this.getExtraChargeCategory();
      }, 1000);
    });
  }

}
