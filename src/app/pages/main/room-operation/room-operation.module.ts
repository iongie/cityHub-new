import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomOperationComponent } from './room-operation.component';
import { Routes, RouterModule } from '@angular/router';
import { ThemeModule } from '../../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { UnderConstractionModule } from '../under-constraction/under-constraction.module';
import { StatusModule } from './conf/status/status.module';
import { LinkDetailModule } from './conf/link-detail/link-detail.module';
const routes: Routes = [
  {
    path: '',
    component: RoomOperationComponent,
  },
];
@NgModule({
  declarations: [RoomOperationComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ThemeModule,
    Ng2SmartTableModule,
    // UnderConstractionModule,
    LinkDetailModule,
    StatusModule,
  ],
})
export class RoomOperationModule { }
