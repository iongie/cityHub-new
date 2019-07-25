import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';
import { NbMenuService } from '@nebular/theme';
import { TaxService } from '../../../../../services/tax/tax.service';
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
  items = [
    { title: ' View',
      icon: 'fa fa-search-plus',
      data: {
        id: '',
        status: '',
      },
    },
    { title: ' Delete',
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
    private taxServ: TaxService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.taxId;
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
          id: this.value.taxId,
        },
      };
      return xyz;
    });
    if (this.value.taxRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.taxRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'tax'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        this.router.navigate(['/pages/view-tax', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Delete') {
        const data = {
          id: this.renderValue,
        };
        this.taxServ.delete(data).pipe(takeUntil(this.subs)).subscribe(res => {
          const title = 'Tax';
          const content = 'Tax has been deleted';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
        }, err => {
          const title = 'Tax';
          const content = 'Error Data';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
        });
      }
    });
  }

}
