import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorService } from '../../../../../services/floor/floor.service';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { RoomOperationService } from '../../../../../services/room-operation/room-operation.service';
import { RoomStatusService } from '../../../../../services/room-status/room-status.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  roomOperation: any;
  floor: any;
  status: any;
  roomType: any;
  userCityHub: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    public roomTypeServ: RoomTypeService,
    public floorServ: FloorService,
    public roomOperationServ: RoomOperationService,
    public roomStatusServ: RoomStatusService,
    public authServ: AuthService,
    private notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.getFloor();
    this.getRoomStatus();
    this.getRoomType();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getFloor() {
    this.floorServ.get().pipe(takeUntil(this.subs)).subscribe(resFloor => {
      this.floor =  resFloor.map((y) => {
        const z = {
          floorName: y.floor_name,
          floorStatus: y.floor_db_status,
          floorId: y.floor_id,
        };
        return z;
      });
    });
  }

  getRoomType() {
    this.roomTypeServ.get().pipe(takeUntil(this.subs)).subscribe(resRoomType => {
      this.roomType = resRoomType.map((forResRoomType) => {
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
        };
        return DataForResRoomType;
      });
      console.log(this.roomType);
    });
  }

  getRoomStatus() {
    this.roomStatusServ.get().pipe(takeUntil(this.subs)).subscribe(ressRoomStatus => {
      this.status = ressRoomStatus.map((forRoomStatus) => {
        const dataForRoomStatus = {
          roomStatusId: forRoomStatus.room_status_id,
          roomStatusName: forRoomStatus.room_status_name,
        };
        return dataForRoomStatus;
      });
    });
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        name : res[0].full_name,
      };
      console.log(res);
    });
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const roomOperationId = {
        id: params.id,
      };
      this.roomOperationServ.getById(roomOperationId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((y) => {
          const xyz = {
            roomId: y.room_id,
            roomName: y.room_name,
            roomTypeId: y.room_type_id,
            floorId: y.floor_id,
            roomStatusId: y.room_status_id,
            roomDbStatus: y.room_db_status,
            createdAt: y.created_at,
            updatedAt: y.updated_at,
            createdBy: y.created_by,
            updatedBy: y.updated_by,
          };
          return xyz;
        });
        this.roomOperation = data;
        console.log(this.roomOperation);
      });
    });
  }

  updateRoomOperation() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        roomId: params.id,
        roomName: this.roomOperation.roomName,
        roomTypeId: this.roomOperation.roomTypeId,
        floorId: this.roomOperation.floorId,
        roomStatusId: this.roomOperation.roomStatusId,
        updateBy: this.userCityHub.username,
      };
      this.roomOperationServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Room Operation';
        const content = 'Data has been update';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/room-operation']);
      }, err => {
        const title = 'Room Operation';
        const content = 'Error';
        this.notifServ.showInfoTypeToast(title, content);
      });
    });
  }

}
