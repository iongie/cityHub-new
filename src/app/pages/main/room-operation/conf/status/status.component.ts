import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { NbMenuService } from '@nebular/theme';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit, OnDestroy, ViewCell {
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
    private roomServ: RoomTypeService,
    private notifServ: NotificationService,
    private router: Router,
  ) { }

  ngOnInit() {
    console.log('rowData', this.rowData);
    this.renderValue = this.value.roomDbStatus;
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

}
