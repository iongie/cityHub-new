import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RoomStatusComponent } from './room-status/room-status.component';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { PlayerComponent } from './rooms/player/player.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    RoomStatusComponent,
    RoomsComponent,
    RoomListComponent,
    PlayerComponent,],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,

  ],
})

export class DashboardModule {

  
  constructor() {}
  
}