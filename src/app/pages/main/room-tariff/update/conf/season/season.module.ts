import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonComponent } from './season.component';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../../../@theme/theme.module';
import { NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [SeasonComponent],
  entryComponents: [SeasonComponent],
  imports: [
    CommonModule,
    FormsModule,
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
  ],
})
export class SeasonModule { }
