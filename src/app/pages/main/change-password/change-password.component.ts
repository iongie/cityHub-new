import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {

  settingTogglePassword = [
    {
      title: 'oldPassword',
      password: 'password',
      icon : 'fa fa-eye-slash',
      showPassword: false,
      oldPassword: '',
    },
    {
      title: 'newPassword',
      password: 'password',
      icon : 'fa fa-eye-slash',
      showPassword: false,
      newPassword: '',
    },
  ];
  constructor(
  ) { }

  ngOnInit() {
  }

  onChangePasswod() {
  }

  togglePassword() {
    this.settingTogglePassword.map((data) => {
      if (data.showPassword && data.oldPassword) {
        data.showPassword = false;
        data.password = 'password';
        data.icon = 'fa fa-eye-slash';
      } else if (data.showPassword && data.newPassword) {
        data.showPassword = false;
        data.password = 'password';
        data.icon = 'fa fa-eye-slash';
      } else {
        data.showPassword = true;
        data.password = 'text';
        data.icon = 'fa fa-eye';
      }
    });
  }


}
