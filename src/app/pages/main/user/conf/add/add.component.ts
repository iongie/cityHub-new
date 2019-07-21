import { Component, OnInit, OnDestroy } from '@angular/core';
import { PrivilegeService } from '../../../../../services/privilege/privilege.service';
import { Router } from '@angular/router';
import { NotificationService } from '../../../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthService } from '../../../../../services/auth/auth.service';

@Component({
  selector: 'ngx-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent implements OnInit, OnDestroy {
  user = {
    fullName: '',
    username: '',
    email: '',
    privilegeId: '',
  };
  privilege: any;
  private subs: Subject<void> = new Subject();
  constructor(
    public authServ: AuthService,
    public privilegeServ: PrivilegeService,
    public router: Router,
    public notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.getPrivilege();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
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

  addUser() {
    this.authServ.register(this.user).pipe(takeUntil(this.subs)).subscribe(() => {
      const title = 'User';
      const content = 'Data has been saved';
      this.notifServ.showSuccessTypeToast(title, content);
    }, err => {
      const title = 'User';
      const content = 'Error';
      this.notifServ.showInfoTypeToast(title, content);
    });
    console.log(this.user);
  }

}
