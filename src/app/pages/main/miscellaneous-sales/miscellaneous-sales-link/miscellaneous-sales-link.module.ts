import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousSalesLinkComponent } from './miscellaneous-sales-link.component';
import { ThemeModule } from '../../../../@theme/theme.module';

@NgModule({
  declarations: [MiscellaneousSalesLinkComponent],
  entryComponents: [MiscellaneousSalesLinkComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class MiscellaneousSalesLinkModule { }
