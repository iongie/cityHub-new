import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { takeUntil } from 'rxjs/operators';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: LocalDataSource;
  private subs: Subject<void> = new Subject();
  forRole: any;
  dataFilter: any;
  show: any;
  settings = {
    actions: false,
    columns: {
      fullName: {
        title: 'Full Name',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'Email',
        type: 'string',
      },
      userStatus: {
        title: 'Status',
        type: 'string',
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
    public authServ: AuthService,
    public userRoleServ: UserRoleService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
    this.refreshAuth();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getUser() {
    const token = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(token).pipe(takeUntil(this.subs)).subscribe(res => {
      this.forRole = {
        id : res[0].privilege_id,
      };
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

        this.authServ.get().pipe(takeUntil(this.subs)).subscribe(user => {
          const data = user.map((y) => {
            const abc = {
              userId: y.user_id,
              userStatus: y.user_status,
              username: y.username,
              updateAt: y.update_at,
              rememberIp: y.remember_ip,
              privilegeId: y.privilege_id,
              fullName: y.full_name,
              email: y.email,
              createAt: y.create_at,
              detail: {
                userId: y.user_id,
                userStatus: y.user_status,
                userUsername: y.username,
                userRoleCreate: filter[0].create_permision,
                userRoleRead: filter[0].read_permision,
                userRoleUpdate: filter[0].update_permision,
                userRoleDelete: filter[0].delete_permision,
              },
            };
            return abc;
          });
          this.user = new LocalDataSource (data);
        });
      });
    });
  }

  refreshAuth() {
    this.authServ.refresh.subscribe(() => {
      this.getUser();
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-user']);
  }
}
