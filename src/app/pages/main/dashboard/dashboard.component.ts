import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { FloorService } from '../../../services/floor/floor.service';
import { RoomOperationService } from '../../../services/room-operation/room-operation.service';
import { RoomStatusService } from '../../../services/room-status/room-status.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../../services/dashboard/dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private subs: Subject<void> = new Subject();
  roomOperation: any;
  roomOperationAvailable: any;
  roomOperatioDirty: any;
  roomOperatioBusy: any;
  roomOperatioCleaning: any;
  roomOperatioNotReady: any;
  roomOperatioTotal: any;
  floor: any;
  dashboardHome: any;
  textColor: any;
  dateNow : any;
  search: any;
  constructor(
    public roomTypeServ: RoomTypeService,
    public floorServ: FloorService,
    public roomOperationServ: RoomOperationService,
    public roomStatus: RoomStatusService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    public dashboardServ: DashboardService,
  ) { }

  ngOnInit() {
    this.getRoom();
    this.getFloor();
    this.getDashboardRoom();
    this.dateNow = new Date();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getFloor() {
    this.floorServ.get().pipe(takeUntil(this.subs)).subscribe(floor => {
      const data =  floor.map((y) => {
        const z = {
          floorName: y.floor_name,
          floorStatus: y.floor_db_status,
          floorId: y.floor_id,
        };
        return z;
      });
      this.floor = data;
    });
  }

  getDashboardRoom() {
    this.dashboardServ.get().pipe(takeUntil(this.subs)).subscribe(res => {
      this.dashboardHome = res.map(x => {
        if(x.room_status_name === 'AVAILABLE') {
          this.textColor = 'text-primary';
        }
        if(x.room_status_name === 'CLEANING') {
          this.textColor = 'text-info';
        }
        if(x.room_status_name === 'BUSY') {
          this.textColor = 'text-success';
        }
        if(x.room_status_name === 'NOT READY') {
          this.textColor = 'text-danger';
        }
        if(x.room_status_name === 'DIRTY') {
          this.textColor = 'text-info';
        }

        const data = {
          roomId: x.room_id,
          roomName: x.room_name,
          floorId: x.floor_id,
          floorName: x.floor_name,
          roomTypeId: x.room_type_id,
          roomTypeName: x.room_type_name,
          roomStatusId: x.room_status_id,
          roomStatusName: x.room_status_name,
          roomDbStatus: x.room_db_status,
          guestId: x.guest_id,
          guestName: x.guest_name,
          arrivalDate:  x.arrival_date,
          duration:  x.duration,
          departureDate:  x.departure_date,
          charge:  x.charge,
          payment:  x.payment,
          textColor: this.textColor,
        };

        return data;
      });
      console.log('dashboardHome', this.dashboardHome);
    });
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
            
            console.log('roomOperationAvailable', this.roomOperationAvailable);
          });
        });
      });
    }, err => {

    });
  }
}
