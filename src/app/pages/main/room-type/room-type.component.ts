import { RoomTypeModule } from './room-type.module';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Subject } from 'rxjs';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { RoomTypeService } from '../../../services/room-type/room-type.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'ngx-room-type',
  templateUrl: './room-type.component.html',
  styleUrls: ['./room-type.component.scss'],
})
export class RoomTypeComponent implements OnInit, OnDestroy {
  roomType: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
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
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      increaseRate: {
        title: 'Increase rate',
        type: 'html',
        valuePrepareFunction: (value) => {
          return value = Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            currencyDisplay: 'code' }).format(value);
        },
      },
      detail: {
        title: 'Actions',
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
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
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
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
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
                roomTypeRoleCreate: filter[0].create_permision,
                roomTypeRoleRead: filter[0].read_permision,
                roomTypeRoleUpdate: filter[0].update_permision,
                roomTypeRoleDelete: filter[0].delete_permision,
              },
            };
            return DataForResRoomType;
          });
          this.roomType = new LocalDataSource (data);
        }, err => {

        });
      });
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
