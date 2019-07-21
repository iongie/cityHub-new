import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { SeasonService } from '../../../../../services/season/season.service';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
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
    private seasonServ: SeasonService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.seasonId;
    this.action();
    this.data = this.items.map((y) => {
      const xyz = {
        title: '',
        data: {
          id: this.value.seasonId,
          status: this.value.seasonStatus,
        },
      };
      return xyz;
    });
    this.data[0].title = 'View';
    this.data[1].title = 'Change Status';
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'season'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        console.log('v', item.data.id );
        this.router.navigate(['/pages/view-season', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
        console.log('cs', this.renderValue);
        const data = {
          id: this.renderValue,
        };
        if (item.data.status === 'active') {
          this.seasonServ.inactiveAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Season';
            const content = 'Season has been inactived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
            setTimeout(() => {
              // this.router.navigateByUrl('/pages/user', {skipLocationChange: true}).then(() =>
              // this.router.navigate(['pages/user']));
            }, 1000);
          });
        } else if (item.data.status === 'inactive') {
          this.seasonServ.activeAuth(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Season';
            const content = 'Season has been actived';
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
