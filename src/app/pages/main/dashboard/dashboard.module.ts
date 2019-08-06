import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RoomListComponent } from './room-list/room-list.component';
import { RoomStatusComponent } from './room-status/room-status.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
];
@NgModule({
  declarations: [
    DashboardComponent,
    RoomListComponent,
    RoomStatusComponent, ],
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