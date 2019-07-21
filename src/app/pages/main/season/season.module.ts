import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonComponent } from './season.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
import { LinkDetailModule } from './conf/link-detail/link-detail.module';
const routes: Routes = [
  {
    path: '',
    component: SeasonComponent,
  },
];
@NgModule({
  declarations: [SeasonComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    LinkDetailModule,
  ],
})
export class SeasonModule { }
