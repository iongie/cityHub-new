import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: AddComponent,
  },
];
@NgModule({
  declarations: [AddComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ],
})
export class AddModule { }
