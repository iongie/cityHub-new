import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { ThemeModule } from '../../../../../@theme/theme.module';

@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class DetailModule { }
