import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../../services/auth/auth.service';
import { takeUntil } from 'rxjs/operators';
import { PrivilegeService } from '../../../../../services/privilege/privilege.service';
import { NotificationService } from '../../../../../services/notification/notification.service';

@Component({
  selector: 'ngx-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  user: any;
  privilege: any;
  constructor(
    public router: Router,
    private activeRoute: ActivatedRoute,
    private authServ: AuthService,
    private privilegeServ: PrivilegeService,
    private notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.viewById();
    this.getPrivilege();
    this.viewById();
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

}
