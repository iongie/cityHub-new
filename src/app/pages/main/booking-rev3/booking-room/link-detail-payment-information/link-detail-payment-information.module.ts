import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDetailPaymentInformationComponent } from './link-detail-payment-information.component';
import { ThemeModule } from '../../../../../@theme/theme.module';

@NgModule({
  declarations: [LinkDetailPaymentInformationComponent],
  entryComponents: [LinkDetailPaymentInformationComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class LinkDetailPaymentInformationModule { }
