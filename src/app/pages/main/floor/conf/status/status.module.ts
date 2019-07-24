import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status.component';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { LinkDetailComponent } from '../link-detail/link-detail.component';
import { LinkDetailModule } from '../link-detail/link-detail.module';


@NgModule({
  declarations: [StatusComponent],
  entryComponents: [StatusComponent],
  imports: [
    CommonModule,
    ThemeModule,
    LinkDetailModule,
  ],
})
export class StatusModule { }
