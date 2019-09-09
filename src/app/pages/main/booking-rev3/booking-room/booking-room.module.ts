import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingRoomComponent } from './booking-room.component';
import { UnderConstractionModule } from '../../under-constraction/under-constraction.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule } from '@nebular/theme';
import { NgxPrintModule } from 'ngx-print';
import { NgxCurrencyModule } from 'ngx-currency';
import { LinkDetailPaymentInformationModule } from './link-detail-payment-information/link-detail-payment-information.module';

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
    component: BookingRoomComponent,
  },
];
@NgModule({
  declarations: [
    BookingRoomComponent,
  ],
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
    LinkDetailPaymentInformationModule,
  ],
})
export class BookingRoomModule { }
