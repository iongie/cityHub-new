import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousSalesDetailLinkComponent } from './miscellaneous-sales-detail-link.component';
import { ThemeModule } from '../../../../../@theme/theme.module';

@NgModule({
  declarations: [MiscellaneousSalesDetailLinkComponent],
  entryComponents: [MiscellaneousSalesDetailLinkComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class MiscellaneousSalesDetailLinkModule { }
