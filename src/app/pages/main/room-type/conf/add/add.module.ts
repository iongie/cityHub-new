import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { NgxCurrencyModule } from 'ngx-currency';
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
const routes: Routes = [
  {
    path: '',
    component: AddComponent,
  },
];
@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
  ],
})
export class AddModule { }
