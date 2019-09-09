import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkDetailRoomInformationComponent } from './link-detail-room-information.component';
import { ThemeModule } from '../../../../../@theme/theme.module';

@NgModule({
  declarations: [LinkDetailRoomInformationComponent],
  entryComponents: [LinkDetailRoomInformationComponent],
  imports: [
    CommonModule,
    ThemeModule,
  ],
})
export class LinkDetailRoomInformationModule { }
