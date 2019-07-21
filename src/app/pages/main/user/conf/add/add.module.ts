import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddComponent } from './add.component';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
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
