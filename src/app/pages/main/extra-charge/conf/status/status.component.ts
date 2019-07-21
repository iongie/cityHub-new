import { Router } from '@angular/router';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';
import { NbMenuService } from '@nebular/theme';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { NotificationService } from '../../../../../services/notification/notification.service';

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
    private extraChargeServ: ExtraChargeService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.extraChargeStatus;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }


}
