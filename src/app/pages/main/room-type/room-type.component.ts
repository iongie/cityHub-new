import { RoomTypeModule } from './room-type.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss'],
})
export class RoomTypeComponent implements OnInit, OnDestroy {
  roomType: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    actions: false,
    columns: {
      roomTypeName: {
        title: 'Name',
        type: 'string',
      },
      baseAdult: {
        title: 'Base adult',
        type: 'string',
      },
      baseChild: {
        title: 'Base child',
        type: 'string',
      },
      maxAdult: {
        title: 'RatMax adult',
        type: 'string',
      },
      maxChild: {
        title: 'Max child',
        type: 'string',
      },
      roomDesc: {
        title: 'Description',
        type: 'string',
      },
      baseRate: {
        title: 'Base rate',
        type: 'string',
      },
      increaseRate: {
        title: 'Increase rate',
        type: 'string',
      },
      detail: {
        title: '',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public roomTypeServ: RoomTypeService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
   this.getRoomType();
   this.refreshExtraCharge();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getRoomType() {
    this.roomTypeServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomType => {
      const data = resRoomType.map((forResRoomType) => {
        const DataForResRoomType = {
          roomTypeId: forResRoomType.room_type_id,
          roomTypeName: forResRoomType.room_type_name,
          baseAdult: forResRoomType.base_adult,
          baseChild: forResRoomType.base_child,
          maxAdult: forResRoomType.max_adult,
          maxChild: forResRoomType.max_child,
          roomDesc: forResRoomType.room_description,
          baseRate: forResRoomType.base_rate,
          increaseRate: forResRoomType.increase_rate,
          detail: {
            roomTypeId: forResRoomType.room_type_id,
          },
        };
        return DataForResRoomType;
      });
      this.roomType = new LocalDataSource (data);
    }, err => {

    });
  }

  refreshExtraCharge() {
    this.roomTypeServ.refresh.subscribe(() => {
      this.getRoomType();
    });
  }

  toFormAdd() {
    this.router.navigate(['pages/add-room-type']);
  }

}
