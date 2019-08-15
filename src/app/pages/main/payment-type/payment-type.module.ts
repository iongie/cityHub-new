import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeComponent } from './payment-type.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { LinkDetailModule } from './conf/link-detail/link-detail.module';
import { StatusModule } from './conf/status/status.module';

const routes: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
  },
];

@NgModule({
  declarations: [PaymentTypeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    LinkDetailModule,
    StatusModule,
  ]
})
export class PaymentTypeModule { }
