import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoveRoomComponent } from './move-room.component';
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
    component: MoveRoomComponent,
  },
];
@NgModule({
  declarations: [MoveRoomComponent],
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
export class MoveRoomModule { }
