import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RoomsComponent } from './rooms/rooms.component';
import { RoomListComponent } from './rooms/room-list/room-list.component';
import { ShortcutComponent } from './shortcut/shortcut.component';
import { RoomStatusComponent } from './rooms/room-status/room-status.component';
import { RoomMapsComponent } from './rooms/room-maps/room-maps.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    RoomsComponent,
    RoomListComponent,
    ShortcutComponent,
    RoomStatusComponent,
    RoomMapsComponent,],
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