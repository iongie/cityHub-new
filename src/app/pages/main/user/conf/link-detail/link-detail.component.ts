import { Component, OnInit, Input, EventEmitter, Output, OnDestroy } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { map, takeUntil, filter } from 'rxjs/operators';
import { ViewCell } from 'ng2-smart-table';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

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
    { title: '',
      data: {
        id: '',
        status: '',
      },
    },
    { title: '',
      data: {
        id: '',
        status: '',
      },
    },
  ];

  tes: any[];
  data: any[];
  constructor(
    private nbMenuService: NbMenuService,
    private authServ: AuthService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }
  ngOnInit() {
    this.renderValue = this.value.userId;
    this.action();
    this.data = this.items.map((y) => {
      const xyz = {
        title: '',
        data: {
          id: this.value.userId,
          status: this.value.userStatus,
        },
      };
      return xyz;
    });
    this.data[0].title = 'View';
    this.data[1].title = 'Change Status';
    // console.log('value', this.value.userId);
    // console.log('items', this.items);
    // console.log('data', this.data);
    // console.log('rowData', this.rowData);
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'user'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        console.log('v', item.data.id );
        this.router.navigate(['/pages/view-user', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
        console.log('cs', this.renderValue);
        const data = {
          id: this.renderValue,
        };
        if (item.data.status === 'active') {
          this.authServ.inactiveAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'User';
            const content = 'User has been inactived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
            setTimeout(() => {
              // this.router.navigateByUrl('/pages/user', {skipLocationChange: true}).then(() =>
              // this.router.navigate(['pages/user']));
            }, 1000);
          });
        } else if (item.data.status === 'inactive') {
          this.authServ.activeAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'User';
            const content = 'User has been actived';
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
    });
  }
}
