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
import { RoomSelectorComponent } from './rooms/room-maps/room-selector/room-selector.component';
import { RoomSelector2Component } from './rooms/room-maps/room-selector2/room-selector2.component';
import { RoomSelector3Component } from './rooms/room-maps/room-selector3/room-selector3.component';
import { PlayerComponent } from './player/player.component';
import { NbRouteTabsetModule, NbTabsetModule } from '@nebular/theme';
import { ApplicationPipesModule } from '../../../_pipe/application-pipe.module';


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
    PlayerComponent,
    RoomSelector3Component,
    RoomSelector2Component,
    RoomSelectorComponent,
    RoomMapsComponent,
    RoomStatusComponent,
    ShortcutComponent,
    RoomListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    NbRouteTabsetModule,
    ApplicationPipesModule,
  ],
})

export class DashboardModule { }
