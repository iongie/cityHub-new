import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropertyInformationComponent } from './property-information.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
const routes: Routes = [
  {
    path: '',
    component: PropertyInformationComponent,
  },
];
@NgModule({
  declarations: [PropertyInformationComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
  ]
})
export class PropertyInformationModule { }
