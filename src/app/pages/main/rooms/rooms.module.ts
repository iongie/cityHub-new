import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';

import { RoomsComponent } from './rooms.component';
import { RoomSelectorComponent } from './room-selector/room-selector.component';
import { PlayerComponent } from './player/player.component';
const routes: Routes = [
  {
    path: '',
    component: RoomsComponent,
  },
];

@NgModule({
  declarations: [RoomsComponent, RoomSelectorComponent, PlayerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,

  ]
})
export class RoomsModule { }
