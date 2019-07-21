import { RoomTypeService } from './../../../../../services/room-type/room-type.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil, filter, map } from 'rxjs/operators';

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
    private roomTypeServ: RoomTypeService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('rowData', this.rowData);
    this.renderValue = this.value.roomTypeId;
    this.action();
    this.data = this.items.map((y) => {
      const xyz = {
        title: '',
        data: {
          id: this.value.roomTypeId,
        },
      };
      return xyz;
    });
    this.data[0].title = 'View';
    this.data[1].title = 'Delete';
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  action() {
    this.nbMenuService.onItemClick().pipe(
      takeUntil(this.subs),
      filter(({ tag }) => tag === 'room-type'),
      map(({item}) => item),
    ).subscribe(item => {
      if (item.data.id === this.renderValue && item.title === 'View') {
        this.router.navigate(['/pages/view-room-type', this.renderValue]);
      }else if (item.data.id === this.renderValue && item.title === 'Delete') {
        const data = {
          id: this.renderValue,
        };
        this.roomTypeServ.delete(data).pipe(takeUntil(this.subs)).subscribe(() => {
          const title = 'Room Type';
          const content = 'Room type has been deleted';
          setTimeout(() => {
            this.notifServ.showInfoTypeToast(title, content);
          }, 2000);
          setTimeout(() => {
          }, 1000);
        });
      }
    });
  }

}
