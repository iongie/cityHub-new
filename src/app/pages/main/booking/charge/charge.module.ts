import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeComponent } from './charge.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ThemeModule } from '../../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbMomentDateModule } from '@nebular/moment';
import { NbCheckboxModule } from '@nebular/theme';
import { UnderConstractionModule } from '../../under-constraction/under-constraction.module';
const routes: Routes = [
  {
    path: '',
    component: ChargeComponent,
  },
];
@NgModule({
  declarations: [ChargeComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbMomentDateModule,
    NbCheckboxModule,
    // UnderConstractionModule,
  ]
})
export class ChargeModule { }
