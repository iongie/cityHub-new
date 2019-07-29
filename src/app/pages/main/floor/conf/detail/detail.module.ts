import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { FormsModule } from '@angular/forms';
import { NbInputModule } from '@nebular/theme';
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
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ],
})
export class DetailModule { }
