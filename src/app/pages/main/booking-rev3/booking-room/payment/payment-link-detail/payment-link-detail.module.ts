import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentLinkDetailComponent } from './payment-link-detail.component';
import { ThemeModule } from '../../../../../../@theme/theme.module';

@NgModule({
  declarations: [PaymentLinkDetailComponent],
  entryComponents: [PaymentLinkDetailComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class PaymentLinkDetailModule { }
