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
import { RoomInformationComponent } from './room-information/room-information.component';
import { ChargeComponent } from './charge/charge.component';
import { ExtraChargeComponent } from './extra-charge/extra-charge.component';
import { ChargeTotalComponent } from './charge-total/charge-total.component';
import { PaymentComponent } from './payment/payment.component';
import { LinkDetailModule } from './charge/link-detail/link-detail.module';
import { PaymentLinkDetailModule } from './payment/payment-link-detail/payment-link-detail.module';
import { RoomNotFoundComponent } from './room-information/room-not-found/room-not-found.component';
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
    component: BookingRoomComponent,
  },
];
@NgModule({
  declarations: [
    BookingRoomComponent,
    RoomInformationComponent,
    ChargeComponent,
    ExtraChargeComponent,
    ChargeTotalComponent,
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
    NbCheckboxModule,
    // UnderConstractionModule,
    LinkDetailModule,
    PaymentLinkDetailModule,
  ],
})
export class BookingRoomModule { }
