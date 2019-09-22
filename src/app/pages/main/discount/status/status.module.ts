import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { ThemeModule } from '../../../../@theme/theme.module';
import { LinkToDetailModule } from '../link-to-detail/link-to-detail.module';

@NgModule({
  declarations: [StatusComponent],
  entryComponents: [StatusComponent],
  imports: [
    CommonModule,
    ThemeModule,
    LinkToDetailModule,
  ],
})
export class StatusModule { }
