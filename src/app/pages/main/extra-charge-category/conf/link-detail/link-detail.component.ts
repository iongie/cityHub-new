import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';
import { ExtraChargeCategoryService } from '../../../../../services/extra-charge-category/extra-charge-category.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';

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
    { title: 'View',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
        status: '',
      },
    },
    { title: 'Delete',
      icon: 'fa fa-trash',
      data: {
        id: '',
        status: '',
      },
    },
  ];
  data: any[];
  constructor(
    private nbMenuService: NbMenuService,
    private extraChargeCategoryServ: ExtraChargeCategoryService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.extraChargeCategoryId;
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
          id: this.value.extraChargeCategoryId,
        },
      };
      return xyz;
    });
    if (this.value.extraChargeCategoryRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.extraChargeCategoryRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'extra-charge-category'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        this.router.navigate(['/pages/view-extra-charge-category', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Delete') {
        const data = {
          id: this.renderValue,
        };

        this.extraChargeCategoryServ.delete(data).pipe(takeUntil(this.subs)).subscribe(() => {
          const title = 'Extra charge category';
          const content = 'Extra charge category has been delete';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
        }, err => {
          const title = 'Extra charge category';
          const content = 'Error Data';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
        });
      }
    });
  }

}
