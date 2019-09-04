import { Component, OnInit, OnDestroy } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { NotificationService } from '../../../services/notification/notification.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit, OnDestroy {
  private subs: Subject<void> = new Subject();
  settingForm = {
    new: {
      type: 'password',
      icon: 'fa fa-eye-slash',
      valNew: '',
    },
    old: {
      type: 'password',
      icon: 'fa fa-eye-slash',
      valOld: '',
    },
  };
  userCityHub: any;
  constructor(
    public router: Router,
    public authServ: AuthService,
    private notifServ: NotificationService,
  ) { }

  ngOnInit() {
    this.settingForm;
    this.detailAccount();
  }

  ngOnDestroy() {
    this.subs.next();
    this.subs.complete();
  }

  detailAccount() {
    const data = {
      token: localStorage.getItem('p_l1oxt'),
    };
    this.authServ.detailAfterLogin(data).pipe(takeUntil(this.subs)).subscribe(res => {
      this.userCityHub = {
        id : res[0].user_id,
      };
    });
  }

  cancelChange() {
    this.router.navigate(['pages/dashboard']);
  }

  changeNewPassword() {
    if (this.settingForm.new.icon === 'fa fa-eye-slash') {
      this.settingForm.new.icon = 'fa fa-eye';
      this.settingForm.new.type = 'text';
    }else {
      this.settingForm.new.icon = 'fa fa-eye-slash';
      this.settingForm.new.type = 'password';
    }
  }

  changeOldPassword() {
    if (this.settingForm.old.icon === 'fa fa-eye-slash') {
      this.settingForm.old.icon = 'fa fa-eye';
      this.settingForm.old.type = 'text';
    }else {
      this.settingForm.old.icon = 'fa fa-eye-slash';
      this.settingForm.old.type = 'password';
    }
  }

  changePasswod() {
    const data = {
      oldPassword:  this.settingForm.old.valOld,
      newPassword:  this.settingForm.new.valNew,
      userId: this.userCityHub.id,
    };

    this.authServ.changePassword(data)
    .pipe(takeUntil(this.subs))
    .subscribe(() => {
      const title = 'Change Password';
      const content = 'Change Password successfully';
      this.notifServ.showSuccessTypeToast(title, content);

      this.router.navigate(['pages/dashboard']);
    }, err => {
      const title = 'Change Password - Error';
      const content = 'Error';
      this.notifServ.showSuccessTypeToast(title, content);
    });
  }


}
