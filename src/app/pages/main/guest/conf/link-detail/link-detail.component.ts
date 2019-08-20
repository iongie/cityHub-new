import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { takeUntil, filter, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ViewCell } from 'ng2-smart-table';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { NbMenuService } from '@nebular/theme';
import { GuestService } from '../../../../../services/guest/guest.service';

@Component({
  selector: 'ngx-link-detail',
  templateUrl: './link-detail.component.html',
  styleUrls: ['./link-detail.component.scss']
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
    private guestServ: GuestService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.guestId;
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
          id: this.value.guestId,
        },
      };
      return xyz;
    });
    if (this.value.guestRoleUpdate === 'allowed') {
      this.data = dataMap;
    }else if (this.value.guestRoleUpdate === 'not allowed') {
      this.data = dataMap.filter((fil) => {
        return fil.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'guest'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        console.log('v', item.data.id );
        this.router.navigate(['/pages/view-guest', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Delete') {
        console.log('cs', this.renderValue);
        const data = {
          id: this.renderValue,
        };

        this.guestServ.delete(data).pipe(takeUntil(this.subs)).subscribe(() => {
          const title = 'Guest';
          const content = 'Guest has been delete';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
        }, err => {
          const title = 'Guest';
          const content = 'Error Data';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
        });
      }
    });
  }

}
