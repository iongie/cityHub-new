import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './detail.component';
// import { UnderConstractionModule } from '../../../under-constraction/under-constraction.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../../../../@theme/theme.module';
import { RouterModule, Routes } from '@angular/router';
import { NbInputModule } from '@nebular/theme';
// import { FormsModule } from '@angular/forms';
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
    // FormsModule,
    ThemeModule,
    NbInputModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ],
})
export class DetailModule { }
