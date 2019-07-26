import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePassword = {
    oldPassword: '',
    newPassword: '',
  };
  settingTogglePassword = [
    {
      title: 'oldPassword',
      password: 'password',
      icon : 'fa fa-eye-slash',
      showPassword: false,
    },
    {
      title: 'newPassword',
      password: 'password',
      icon : 'fa fa-eye-slash',
      showPassword: false,
    },
  ];
  constructor(
  ) { }

  ngOnInit() {
  }

  onChangePasswod() {
  }

  togglePassword() {
    if (this.settingTogglePassword[0].showPassword) {
      this.settingTogglePassword[0].showPassword = false;
      this.settingTogglePassword[1].showPassword = false;
      this.settingTogglePassword[0].password = 'password';
      this.settingTogglePassword[1].password = 'password';
      this.settingTogglePassword[0].icon = 'fa fa-eye-slash' ;
      this.settingTogglePassword[1].icon = 'fa fa-eye-slash' ;
    }else if (this.settingTogglePassword[1].showPassword) {
      this.settingTogglePassword[0].showPassword = false;
      this.settingTogglePassword[1].showPassword = false;
      this.settingTogglePassword[0].password = 'password';
      this.settingTogglePassword[1].password = 'password';
      this.settingTogglePassword[0].icon = 'fa fa-eye-slash' ;
      this.settingTogglePassword[1].icon = 'fa fa-eye-slash' ;
    } else {
      this.settingTogglePassword[0].showPassword = true;
      this.settingTogglePassword[1].showPassword = true;
      this.settingTogglePassword[0].password = 'password';
      this.settingTogglePassword[1].password = 'password';
      this.settingTogglePassword[0].icon = 'fa fa-eye' ;
      this.settingTogglePassword[1].icon = 'fa fa-eye' ;
    }
  }


}
