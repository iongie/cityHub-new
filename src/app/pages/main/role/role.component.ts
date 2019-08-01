import { PrivilegeService } from './../../../services/privilege/privilege.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { UserRoleService } from '../../../services/user-role/user-role.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
    public privilegeServ: PrivilegeService,
  ) { }

  ngOnInit() {
    this.getRole();
    this.getPrivilege();
    this.refreshRole();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  refreshRole() {
    this.userRoleServ.refresh.subscribe(() => {
      this.getRole();
    });
  }

  getRole() {

  }

  getPrivilege() {
    this.privilegeServ.get().pipe(takeUntil(this.subs)).subscribe(resPrivilege => {
      const ret = resPrivilege.map((forResPrivilege) => {
        const dataResPrivilege = {
          privilegeId: forResPrivilege.privilege_id,
          privilegeName: forResPrivilege.privilege_name,
          privilegeDesc: forResPrivilege.privilege_description,
        };
        return dataResPrivilege;
      });
      console.log('return privilege', ret);
      console.log('privilege of server', resPrivilege);
    });
  }

  filterByPrivilege() {

  }

}
