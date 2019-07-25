import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { ThemeModule } from '../../../../../@theme/theme.module';

@NgModule({
  declarations: [StatusComponent],
  entryComponents: [StatusComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class StatusModule { }
