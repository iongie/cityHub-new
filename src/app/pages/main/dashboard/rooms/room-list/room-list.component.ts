import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbThemeService, NbMediaBreakpoint, NbMediaBreakpointsService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { FloorService } from '../../../../../services/floor/floor.service';
import { RoomOperationService } from '../../../../../services/room-operation/room-operation.service';
import { RoomStatusService } from '../../../../../services/room-status/room-status.service';

@Component({
  selector: 'ngx-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss'],
})
export class RoomListComponent implements OnInit, OnDestroy {
  breakpoint: NbMediaBreakpoint;
  breakpoints: any;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  users: { name: string, title: string,  picture: string;  }[] = [
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
    { name: 'Nano Type', title: 'Avilable', picture: '/assets/images/bedroom.png' },
  ];

  // roomOperation = {
  //   roomId: 0,
  //   roomName: '',
  //   roomtypeId: 0,
  //   roomTypeName: '',
  //   floorId: 0,
  //   floorName: '',
  //   roomStatusId: 0,
  //   roomStatusName: '',
  //   roomDbStatus: '',
  //   createdAt: '',
  //   updatedAt: '',
  //   createdBy: '',
  //   updatedBy: '',
  // };
  roomOperation: any;
  floor: any;
  constructor(
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    public roomTypeServ: RoomTypeService,
    public floorServ: FloorService,
    public roomOperationServ: RoomOperationService,
    public roomStatus: RoomStatusService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
    ) {
        this.breakpoints = this.breakpointService.getBreakpointsMap();
        this.themeService.onMediaQueryChange()
        .subscribe(([oldValue, newValue]) => {
          this.breakpoint = newValue;
        });
    }

  ngOnInit() {
    this.getRoom();
    this.getFloor();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getRoom() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'room_type_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

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
                    picture: '/assets/images/bedroom.png',
                  };
                  return DataForResRoomType;
                });
                this.roomOperation = data;
              });
            });
          });
        }, err => {

        });
      });
    });
  }

  getFloor() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'floor_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }

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
      });
    });
  }
}
