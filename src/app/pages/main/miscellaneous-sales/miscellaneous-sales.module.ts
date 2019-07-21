import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiscellaneousSalesComponent } from './miscellaneous-sales.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: MiscellaneousSalesComponent,
  },
];
@NgModule({
  declarations: [MiscellaneousSalesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    UnderConstractionModule,
  ],
})
export class MiscellaneousSalesModule { }
