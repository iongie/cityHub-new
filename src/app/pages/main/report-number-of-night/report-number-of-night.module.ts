import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportNumberOfNightComponent } from './report-number-of-night.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCheckboxModule } from '@nebular/theme';
import { NgxPrintModule } from 'ngx-print';
import { NgxCurrencyModule } from 'ngx-currency';
import { NbDateFnsDateModule } from '@nebular/date-fns';
import { eo } from 'date-fns/locale';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
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
    component: ReportNumberOfNightComponent,
  },
];
@NgModule({
  declarations: [ReportNumberOfNightComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbCheckboxModule,
    NgxPrintModule,
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig),
    // UnderConstractionModule,
    NbDateFnsDateModule.forRoot({
      parseOptions: { locale: eo },
      formatOptions: { locale: eo },
    }),
    PDFExportModule,
  ],
})
export class ReportNumberOfNightModule { }
