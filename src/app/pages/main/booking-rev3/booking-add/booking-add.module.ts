import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingAddComponent } from './booking-add.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule } from '@nebular/theme';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { eo } from 'date-fns/locale';

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
    component: BookingAddComponent,
  },
];
@NgModule({
  declarations: [BookingAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // NbMomentDateModule,
    NbCheckboxModule,
    // UnderConstractionModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: eo },
      formatOptions: { locale: eo },
    }),
  ],
})
export class BookingAddModule { }
