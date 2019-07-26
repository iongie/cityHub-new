import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { Router, ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  roomType: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private roomTypeServ: RoomTypeService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  viewById() {
    this.activeRoute.params.subscribe(params => {
      const userId = {
        id: params.id,
      };
      this.roomTypeServ.getById(userId).pipe(takeUntil(this.subs)).subscribe(resById => {
        const data = resById.map((forResRoomType) => {
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
        this.roomType = data;
      });
    });
  }

  updateRoomType() {
    this.activeRoute.params.subscribe(params => {
      const data = {
        roomTypeId: params.id,
        roomTypeName: this.roomType[0].roomTypeName,
        baseAdult: this.roomType[0].baseAdult,
        baseChild: this.roomType[0].baseChild,
        maxAdult: this.roomType[0].maxAdult,
        maxChild: this.roomType[0].maxChild,
        roomDescription: this.roomType[0].roomDesc,
        baseRate: this.roomType[0].baseRate,
        increaseRate: this.roomType[0].increaseRate,
      };
      this.roomTypeServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'Room type';
        const content = 'Data has been update';
        this.notifServ.showSuccessTypeToast(title, content);
        this.router.navigate(['pages/room-type']);
      }, err => {
        const title = 'Room type';
        const content = 'Error';
        this.notifServ.showInfoTypeToast(title, content);
      });
    });
  }

  detailUserRole() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };
      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'room_type_module';
        });

        if (filter[0].create_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].create_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].read_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].read_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].update_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].update_permision === 'not allowed') {
          this.show = false;
        }else if (filter[0].delete_permision === 'allowed') {
          this.show = true;
        }else if (filter[0].delete_permision === 'not allowed') {
          this.show = false;
        }
      });
    });
  }

}
