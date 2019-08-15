import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingDetailComponent } from './booking-detail.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule, NbDialogModule } from '@nebular/theme';
import { NgxCurrencyModule } from 'ngx-currency';
import { UnderConstractionModule } from '../../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: BookingDetailComponent,
  },
];

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
@NgModule({
  declarations: [BookingDetailComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    //UnderConstractionModule,
  ]
})
export class BookingDetailModule { }
