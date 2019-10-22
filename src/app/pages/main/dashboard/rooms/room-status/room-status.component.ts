import { Component, OnInit, OnDestroy } from '@angular/core';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { FloorService } from '../../../../../services/floor/floor.service';
import { RoomOperationService } from '../../../../../services/room-operation/room-operation.service';
import { RoomStatusService } from '../../../../../services/room-status/room-status.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-room-status',
  templateUrl: './room-status.component.html',
  styleUrls: ['./room-status.component.scss']
})
export class RoomStatusComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  roomOperation: any;
  roomOperationAvailable: any;
  roomOperatioDirty: any;
  roomOperatioBusy: any;
  roomOperatioCleaning: any;
  roomOperatioNotReady: any;
  roomOperatioTotal: any;
  constructor(
    public roomTypeServ: RoomTypeService,
    public floorServ: FloorService,
    public roomOperationServ: RoomOperationService,
    public roomStatus: RoomStatusService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.getRoom();
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
                roomStatusName: filterResRoomStatus[0].room_status_name,
              };
              return DataForResRoomType;
            });
            this.roomOperation = data;

            const roomOperatioBusy = this.roomOperation.filter(x => {
              return x.roomStatusName === 'BUSY';
            });

            const roomOperatioCleaning = this.roomOperation.filter(x => {
              return x.roomStatusName === 'CLEANING';
            });

            const roomOperatioDirty = this.roomOperation.filter(x => {
              return x.roomStatusName === 'DIRTY';
            });

            const roomOperationAvailable = this.roomOperation.filter(x => {
              return x.roomStatusName === 'AVAILABLE';
            });

            const roomOperatioNotReady = this.roomOperation.filter(x => {
              return x.roomStatusName === 'NOT READY';
            });

            this.roomOperatioTotal = this.roomOperation.length;

            this.roomOperatioBusy = roomOperatioBusy.length;

            this.roomOperatioCleaning = roomOperatioCleaning.length;

            this.roomOperatioDirty = roomOperatioDirty.length;

            this.roomOperationAvailable = roomOperationAvailable.length;

            this.roomOperatioNotReady = roomOperatioNotReady.length;
            
            console.log(this.roomOperationAvailable);
          });
        });
      });
    }, err => {

    });
  }

}
