import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessStayComponent } from './less-stay.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule } from '@nebular/theme';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
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
    component: LessStayComponent,
  },
];
@NgModule({
  declarations: [LessStayComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
    NbCheckboxModule,
    // UnderConstractionModule,
  ],
})
export class LessStayModule { }
