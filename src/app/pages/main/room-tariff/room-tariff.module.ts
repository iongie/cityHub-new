import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomTariffComponent } from './room-tariff.component';
import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: RoomTariffComponent,
  },
];
@NgModule({
  declarations: [RoomTariffComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    UnderConstractionModule,
  ],
})
export class RoomTariffModule { }
