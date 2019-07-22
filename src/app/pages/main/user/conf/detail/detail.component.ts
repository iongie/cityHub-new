import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { PrivilegeService } from '../../../../../services/privilege/privilege.service';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { UserRoleService } from '../../../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  user: any;
  privilege: any;
  forRole: any;
  show: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private authServ: AuthService,
    private privilegeServ: PrivilegeService,
    private notifServ: NotificationService,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.getPrivilege();
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
      this.authServ.getById(userId).pipe(takeUntil(this.subs)).subscribe(resById => {
        console.log(resById);
        const data = resById.map((y) => {
          const xyz = {
            fullName: y.full_name,
            username: y.username,
            email: y.email,
            privilegeId: y.privilege_id,
          };
          return xyz;
        });
        this.user = data;
      });
    });
  }

  getPrivilege() {
    this.privilegeServ.get().pipe(takeUntil(this.subs)).subscribe(privilege => {
      const data = privilege.map((y) => {
        const xyz = {
          privilegeId: y.privilege_id,
          privilegeName : y.privilege_name,
          privilegeDescription : y.privilege_description,
        };
        return xyz;
      });
      this.privilege = data;
      console.log(data);
    });
  }

  updateUser() {
    console.log('data uodate', this.user);
    this.activeRoute.params.subscribe(params => {
      const data = {
        userId: params.id,
        fullName: this.user[0].fullName,
        username: this.user[0].username,
        email: this.user[0].email,
        privilegeId: this.user[0].privilegeId,
      };
      this.authServ.update(data).pipe(takeUntil(this.subs)).subscribe(() => {
        const title = 'User';
        const content = 'Data has been saved';
        this.notifServ.showSuccessTypeToast(title, content);
      }, err => {
        const title = 'User';
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

      console.log(this.forRole);

      this.userRoleServ.getByPrivilegeId(this.forRole).pipe(takeUntil(this.subs)).subscribe(resUserRole => {
        const filter = resUserRole.filter((forResUserRole) => {
          return forResUserRole.module_name === 'user_module';
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
