import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { ExtraChargeService } from '../../../../../services/extra-charge/extra-charge.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { NbMenuService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { ViewCell } from 'ng2-smart-table';
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
  items = [
    { title: ' View',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
        status: '',
      },
    },
    { title: ' Change Status',
      icon: 'fas fa-exchange-alt',
      data: {
        id: '',
        status: '',
      },
    },
  ];
  data: any[];
  constructor(
    private nbMenuService: NbMenuService,
    private extraChargeServ: ExtraChargeService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.extraChargeId;
    this.action();
    this.viewOption();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewOption() {
    const dataMap = this.items.map((y) => {
      const xyz = {
        title: y.title,
        icon: y.icon,
        data: {
          id: this.value.extraChargeId,
          status: this.value.extraChargeStatus,
        },
      };
      return xyz;
    });
    if (this.value.extraChargeRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.extraChargeRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'extra-charge'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        this.router.navigate(['/pages/view-extra-charge', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
        console.log('cs', this.renderValue);
        const data = {
          id: this.renderValue,
        };
        if (item.data.status === 'active') {
          this.extraChargeServ.inactiveAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Extra charge';
            const content = 'Extra charge has been inactived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        } else if (item.data.status === 'inactive') {
          this.extraChargeServ.activeAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Extra charge';
            const content = 'Extra charge has been actived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        }
      }
    });
  }

}
