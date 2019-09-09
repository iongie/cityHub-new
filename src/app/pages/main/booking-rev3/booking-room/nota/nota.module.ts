import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotaComponent } from './nota.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule } from '@nebular/theme';
import { NgxPrintModule } from 'ngx-print';
import { NgxCurrencyModule } from 'ngx-currency';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
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
    component: NotaComponent,
  },
];
@NgModule({
  declarations: [NotaComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
    NbCheckboxModule,
    NgxPrintModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    // UnderConstractionModule,
  ],
})
export class NotaModule { }
