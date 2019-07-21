import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { NbInputModule } from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment';
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
    NbInputModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NbMomentDateModule,
    // UnderConstractionModule,
  ],
})
export class DetailModule { }
