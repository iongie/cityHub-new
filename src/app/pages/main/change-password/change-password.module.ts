import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';
import { NbCheckboxModule, NbButtonModule, NbInputModule, NbAlertModule } from '@nebular/theme';
const routes: Routes = [
  {
    path: '',
    component: ChangePasswordComponent,
  },
];
@NgModule({
  declarations: [ChangePasswordComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbAuthModule,
  ],
})
export class ChangePasswordModule { }
