import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDetailComponent } from './link-detail.component';
import { ThemeModule } from '../../../../../@theme/theme.module';

@NgModule({
  declarations: [LinkDetailComponent],
  entryComponents: [LinkDetailComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ]
})
export class LinkDetailModule { }
