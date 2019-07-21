import { Component, OnInit, OnDestroy } from '@angular/core';
import { TaxService } from '../../../services/tax/tax.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';

@Component({
  selector: 'ngx-tax',
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.scss'],
})
export class TaxComponent implements OnInit, OnDestroy {
  tax: LocalDataSource;
  private subs: Subject<void> = new Subject();
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
      taxStatus: {
        title: 'Status',
        type: 'string',
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
    public taxServ: TaxService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getTax();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getTax() {
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
          detail: {
            taxId: y.tax_id,
            taxStatus: y.tax_status,
          },
        };
        return abc;
      });
      console.log(data);
      this.tax = new LocalDataSource (data);
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-tax']);
  }

}
