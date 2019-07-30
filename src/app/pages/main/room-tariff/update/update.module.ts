import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateComponent } from './update.component';
import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { WeekendTariffModule } from './conf/weekend-tariff/weekend-tariff.module';
import { SeasonModule } from './conf/season/season.module';
import { WeekdayTariffModule } from './conf/weekday-tariff/weekday-tariff.module';
const routes: Routes = [
  {
    path: '',
    component: UpdateComponent,
  },
];
@NgModule({
  declarations: [UpdateComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    WeekendTariffModule,
    WeekdayTariffModule,
    SeasonModule,
  ],
})
export class UpdateModule { }
