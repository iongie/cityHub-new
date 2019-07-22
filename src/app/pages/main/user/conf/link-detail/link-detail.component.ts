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
    this.viewOption();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewOption() {
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
    if (this.value.userRoleUpdate === 'allowed') {
      this.items;
    }else if (this.value.userRoleUpdate === 'not allowed') {
      this.items.filter((y) =>{
        return y.title === 'View';
      });
    }
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'user'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        this.router.navigate(['/pages/view-user', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
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
          });
        } else if (item.data.status === 'inactive') {
          this.authServ.activeAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'User';
            const content = 'User has been actived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
          });
        }
      }
    });
  }
}
