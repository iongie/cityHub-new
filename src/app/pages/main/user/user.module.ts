import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
import { LinkDetailModule } from './conf/link-detail/link-detail.module';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
  },
];
@NgModule({
  declarations: [UserComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    LinkDetailModule,
  ],
})
export class UserModule { }
