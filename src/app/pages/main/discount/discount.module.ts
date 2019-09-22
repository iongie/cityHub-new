import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiscountComponent } from './discount.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCheckboxModule } from '@nebular/theme';
import { NgxPrintModule } from 'ngx-print';
import { NgxCurrencyModule } from 'ngx-currency';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { eo } from 'date-fns/locale';
import { LinkToDetailModule } from './link-to-detail/link-to-detail.module';
export const customCurrencyMaskConfig = {
  align: 'right',
  allowNegative: true,
  allowZero: true,
  decimal: ',',
  precision: 0,
  prefix: 'Rp ',
  suffix: '',
  thousands: '.',
  nullable: true,
};
const routes: Routes = [
  {
    path: '',
    component: DiscountComponent,
  },
];
@NgModule({
  declarations: [DiscountComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NgxPrintModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    // UnderConstractionModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: eo },
      formatOptions: { locale: eo },
    }),
    LinkToDetailModule,
  ],
})
export class DiscountModule { }
