import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivilegeComponent } from './privilege.component';
import { Routes, RouterModule } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../@theme/theme.module';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: PrivilegeComponent,
  },
];
@NgModule({
  declarations: [PrivilegeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ],
})
export class PrivilegeModule { }
