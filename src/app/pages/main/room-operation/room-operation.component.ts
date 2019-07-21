import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { FloorService } from '../../../services/floor/floor.service';
import { RoomOperationService } from '../../../services/room-operation/room-operation.service';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { StatusComponent } from './conf/status/status.component';
import { takeUntil } from 'rxjs/operators';
import { RoomStatusService } from '../../../services/room-status/room-status.service';

@Component({
  selector: 'ngx-room-operation',
  templateUrl: './room-operation.component.html',
  styleUrls: ['./room-operation.component.scss'],
})
export class RoomOperationComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  roomOperation: LocalDataSource;
  settings = {
    actions: false,
    columns: {
      roomName: {
        title: 'Name',
        type: 'string',
      },
      roomTypeName: {
        title: 'Type',
        type: 'string',
      },
      floorName: {
        title: 'Floor',
        type: 'string',
      },
      roomDesc: {
        title: 'Description',
        type: 'string',
      },
      roomStatusName: {
        title: 'Room Status',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'custom',
        renderComponent: StatusComponent,
        filter: false,
      },
      detail: {
        title: 'Detail',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public roomTypeServ: RoomTypeService,
    public floorServ: FloorService,
    public roomOperationServ: RoomOperationService,
    public roomStatus: RoomStatusService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getRoom();
    this.refreshRoom();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getRoom() {
    this.roomOperationServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomOperation => {
      this.floorServ.get().pipe(takeUntil(this.subs)).subscribe(resFloor => {
        this.roomTypeServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomType => {
          this.roomStatus.get().pipe(takeUntil(this.subs)).subscribe(resRoomStatus => {
            const data = resRoomOperation.map((forResRoom) => {
              const filterResFloor = resFloor.filter((abc) => {
                return abc.floor_id === forResRoom.floor_id && abc.floor_db_status === 'active';
              });
              const filterResRoomType = resRoomType.filter((def) => {
                return def.room_type_id === forResRoom.room_type_id;
              });
              const filterResRoomStatus = resRoomStatus.filter((ghi) => {
                return ghi.room_status_id === forResRoom.room_status_id;
              });
              const DataForResRoomType = {
                roomId: forResRoom.room_id,
                roomName: forResRoom.room_name,
                roomtypeId: forResRoom.room_type_id,
                roomTypeName: filterResRoomType[0].room_type_name,
                floorId: forResRoom.floor_id,
                floorName: filterResFloor[0].floor_name,
                roomStatusId: forResRoom.room_status_id,
                roomStatusName: filterResRoomStatus[0].room_status_name,
                roomDbStatus: forResRoom.room_db_status,
                createdAt: forResRoom.created_at,
                updatedAt: forResRoom.updated_at,
                createdBy: forResRoom.created_by,
                updatedBy: forResRoom.updated_by,
                detail: {
                  roomId: forResRoom.room_id,
                },
                status: {
                  roomDbStatus: forResRoom.room_db_status,
                },
              };
              return DataForResRoomType;
            });
            this.roomOperation = new LocalDataSource (data);
          });
        });
      });
    }, err => {

    });
  }

  refreshRoom() {
    this.roomTypeServ.refresh.subscribe(() => {
      this.getRoom();
    });
  }

  toFormAdd() {
    this.router.navigate(['pages/add-room-operation']);
  }

}
