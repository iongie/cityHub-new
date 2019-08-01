import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
})
export class RoleComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  constructor(
    public notifServ: NotificationService,
    public router: Router,
    public userRoleServ: UserRoleService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  refreshRoom() {
    this.userRoleServ.refresh.subscribe(() => {
      this.getRole();
    });
  }

  getRole() {

  }

}
