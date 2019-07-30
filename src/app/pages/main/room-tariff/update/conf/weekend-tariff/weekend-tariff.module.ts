import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeekendTariffComponent } from './weekend-tariff.component';
import { ThemeModule } from '../../../../../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [WeekendTariffComponent],
  entryComponents: [WeekendTariffComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
})
export class WeekendTariffModule { }
