import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { TaxService } from '../../../../../services/tax/tax.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';

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
  constructor() { }

  ngOnInit() {
    this.renderValue = this.value.taxStatus;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

}
