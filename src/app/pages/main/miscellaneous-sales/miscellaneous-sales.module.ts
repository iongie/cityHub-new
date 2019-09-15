import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousSalesComponent } from './miscellaneous-sales.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
import { FormsModule } from '@angular/forms';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule } from '@nebular/theme';
import { NgxPrintModule } from 'ngx-print';
import { NgxCurrencyModule } from 'ngx-currency';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { eo } from 'date-fns/locale';
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
    component: MiscellaneousSalesComponent,
  },
];
@NgModule({
  declarations: [MiscellaneousSalesComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // NbMomentDateModule,
    NbCheckboxModule,
    NgxPrintModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    // UnderConstractionModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: eo },
      formatOptions: { locale: eo },
    }),
  ],
})
export class MiscellaneousSalesModule { }
