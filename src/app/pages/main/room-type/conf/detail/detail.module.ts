import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { NgxCurrencyModule } from 'ngx-currency';
const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
  },
];

export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 2,
  prefix: 'Rp ',
  suffix: '',
  thousands: '.',
  nullable: true,
};
@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ],
})
export class DetailModule { }
