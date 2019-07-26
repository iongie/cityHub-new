import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { RoomTypeService } from '../../../../../services/room-type/room-type.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../services/auth/auth.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  roomType = {
    roomTypeName: '',
    baseAdult: 0,
    baseChild: 0,
    maxAdult: 0,
    maxChild: 0,
    roomDesc: '',
    baseRate: '',
    increaseRate: '',
  };
  private subs: Subject<void> = new Subject();
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private roomTypeServ: RoomTypeService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
    public authServ: AuthService,
  ) { }

  ngOnInit() {
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  addRoomType() {
    this.roomTypeServ.add(this.roomType).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Room type';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/room-type']);
    }, err => {
      const title = 'Room type';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
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
