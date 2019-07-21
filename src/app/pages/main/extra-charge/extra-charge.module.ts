import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtraChargeComponent } from './extra-charge.component';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Routes, RouterModule } from '@angular/router';
import { ExtraChargeCategoryComponent } from '../extra-charge-category/extra-charge-category.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { LinkDetailModule } from './conf/link-detail/link-detail.module';
import { StatusModule } from './conf/status/status.module';
const routes: Routes = [
  {
    path: '',
    component: ExtraChargeComponent,
  },
];
@NgModule({
  declarations: [ExtraChargeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    LinkDetailModule,
    StatusModule,
  ],
})
export class ExtraChargeModule { }
