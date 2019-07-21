import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';
import { FloorService } from '../../../../../services/floor/floor.service';

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
    private floorServ: FloorService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.renderValue = this.value.floorId;
    this.action();
    this.data = this.items.map((y) => {
      const xyz = {
        title: '',
        data: {
          id: this.value.floorId,
          status: this.value.floorStatus,
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
      filter(({ tag }) => tag === 'floor'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        console.log('v', item.data.id );
        this.router.navigate(['/pages/view-floor', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Change Status') {
        console.log('cs', this.renderValue);
        const data = {
          id: this.renderValue,
        };
        if (item.data.status === 'active') {
          this.floorServ.inactiveFloor(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Floor';
            const content = 'Floor has been inactived';
            setTimeout(() => {
              this.notifServ.showInfoTypeToast(title, content);
            }, 2000);
            setTimeout(() => {
              // this.router.navigateByUrl('/pages/user', {skipLocationChange: true}).then(() =>
              // this.router.navigate(['pages/user']));
            }, 1000);
          });
        } else if (item.data.status === 'inactive') {
          this.floorServ.activeFloor(data).pipe(takeUntil(this.subs)).subscribe(() => {
            const title = 'Floor';
            const content = 'Floor has been actived';
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
