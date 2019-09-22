import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { DiscountService } from '../../../../services/discount/discount.service';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { NotificationService } from '../../../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit, OnDestroy, ViewCell {
  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  data: any[];
  constructor(
    private nbMenuService: NbMenuService,
    private discountServ: DiscountService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.discountStatus;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }



}
