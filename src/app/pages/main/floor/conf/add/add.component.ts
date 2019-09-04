import { FloorService } from './../../../../../services/floor/floor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { AuthService } from '../../../../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  floor = {
    floorName: '',
  };
  userCityHub: any;
  forRole: any;
  show: any;
  private subs: Subject<void> = new Subject();
  constructor(
    public floorServ: FloorService,
    public authServ: AuthService,
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.detailUserRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  addFloor() {
    const data = {
      floorName: this.floor.floorName,
    };
    this.floorServ.add(data).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'Floor';
      const content = 'Data has been save';
      this.notifServ.showSuccessTypeToast(title, content);
      this.router.navigate(['pages/floor']);
    }, err => {
      const title = 'Floor';
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
          return forResUserRole.module_name === 'floor_module';
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
