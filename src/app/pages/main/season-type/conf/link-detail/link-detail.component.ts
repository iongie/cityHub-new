import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';
import { NbMenuService } from '@nebular/theme';
import { SeasonTypeService } from '../../../../../services/season-type/season-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';

@Component({
  selector: 'ngx-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss'],
})
export class LinkDetailComponent implements OnInit, OnDestroy, ViewCell {
  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;
  private subs: Subject<void> = new Subject();
  constructor(
    private nbMenuService: NbMenuService,
    private seasonTypeServ: SeasonTypeService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value;
    console.log('value', this.value);
    console.log('rowData', this.rowData);
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  toFormAdd() {
    this.router.navigate(['/pages/view-season-type', this.renderValue]);
  }

  deleteSeasonType() {
    const data = {
      id: this.renderValue,
    };
    this.seasonTypeServ.delete(data).pipe(takeUntil(this.subs)).subscribe(res => {
      const title = 'Season type';
      const content = 'Season type has been deleted';
      setTimeout(() => {
        this.notifServ.showInfoTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        // this.router.navigateByUrl('/pages/user', {skipLocationChange: true}).then(() =>
        // this.router.navigate(['pages/user']));
      }, 1000);
    }, err => {
      const title = 'Season type';
      const content = 'Error Data';
      setTimeout(() => {
        this.notifServ.showInfoTypeToast(title, content);
      }, 2000);
      setTimeout(() => {
        // this.router.navigateByUrl('/pages/user', {skipLocationChange: true}).then(() =>
        // this.router.navigate(['pages/user']));
      }, 1000);
    });
  }

}
