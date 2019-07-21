import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: DetailComponent,
  },
];
@NgModule({
  declarations: [DetailComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ],
})
export class DetailModule { }
