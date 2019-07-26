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
  constructor(
  ) { }

  ngOnInit() {
  }

  onChangePasswod() {
  }


}
