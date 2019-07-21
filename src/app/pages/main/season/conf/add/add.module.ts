import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { NbInputModule } from '@nebular/theme';
import { NbMomentDateModule } from '@nebular/moment';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NgxCurrencyModule } from 'ngx-currency';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: AddComponent,
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
  declarations: [AddComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
    NbInputModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    NbMomentDateModule,
    // UnderConstractionModule,
  ],
})
export class AddModule { }
