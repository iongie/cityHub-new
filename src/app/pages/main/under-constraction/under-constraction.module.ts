import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnderConstractionComponent } from './under-constraction.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SmartTableModule } from 'ng2-smart-table';
const routes: Routes = [
  {
    path: '',
    component: UnderConstractionComponent,
  },
];
@NgModule({
  declarations: [UnderConstractionComponent],
  imports: [
    CommonModule,
    ThemeModule,
    RouterModule.forChild(routes),
    Ng2SmartTableModule,
  ],
})
export class UnderConstractionModule { }
