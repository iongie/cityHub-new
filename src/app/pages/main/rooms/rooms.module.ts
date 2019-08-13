import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';

import { RoomsComponent } from './rooms.component';
import { RoomSelectorComponent } from './room-selector/room-selector.component';
import { RoomSelector2Component } from './room-selector2/room-selector2.component';
import { RoomSelector3Component } from './room-selector3/room-selector3.component';
const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
  },
];

@NgModule({
  declarations: [RoomsComponent, RoomSelectorComponent, RoomSelector2Component, RoomSelector3Component],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,

  ]
})
export class RoomsModule { }
