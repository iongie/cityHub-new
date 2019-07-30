import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekdayTariffComponent } from './weekday-tariff.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../../../@theme/theme.module';
import { NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [WeekdayTariffComponent],
  entryComponents: [WeekdayTariffComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
})
export class WeekdayTariffModule { }
