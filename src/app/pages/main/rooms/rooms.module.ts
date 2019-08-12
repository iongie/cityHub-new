import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';

import { RoomsComponent } from './rooms.component';
const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
  },
];

@NgModule({
  declarations: [RoomsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,

  ]
})
export class RoomsModule { }
