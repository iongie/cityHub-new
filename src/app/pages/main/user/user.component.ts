import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Subject } from 'rxjs';
import { LocalDataSource } from 'ng2-smart-table';
import { takeUntil } from 'rxjs/operators';
import { LinkDetailComponent } from './conf/link-detail/link-detail.component';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: LocalDataSource;
  private subs: Subject<void> = new Subject();
  settings = {
    actions: false,
    columns: {
      fullName: {
        title: 'Full Name',
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
        title: 'Detail',
        type: 'custom',
        renderComponent: LinkDetailComponent,
        filter: false,
      },
    },
  };
  constructor(
    public authServ: AuthService,
    public notifServ: NotificationService,
    public router: Router,
  ) { }

  ngOnInit() {
    this.getUser();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  getUser() {
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
          },
        };
        return abc;
      });
      console.log(data);
      this.user = new LocalDataSource (data);
    });
  }

  toFormAdd() {
    this.router.navigate(['/pages/add-user']);
  }
}
