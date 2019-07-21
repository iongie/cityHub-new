import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { NbInputModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
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
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ],
})
export class AddModule { }
