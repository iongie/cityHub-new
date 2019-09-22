import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkToDetailComponent } from './link-to-detail.component';
import { ThemeModule } from '../../../../@theme/theme.module';

@NgModule({
  declarations: [LinkToDetailComponent],
  entryComponents: [LinkToDetailComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class LinkToDetailModule { }
